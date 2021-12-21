import { ADSClient } from "../MulticastBeacon";
import { Buffer } from 'buffer';
import { beaconMsg } from './utils';
import EventEmitter from 'events';

export class ServerData extends EventEmitter {
    private static readonly db: Map<string, any> = new Map();
    private _port: number;

    constructor(port: number) {
        super();
        this._port = port;
    }

    get port() {
        return this._port;
    }

    get serverDB(): Map<string, any> {
        return ServerData.db;
    }

    private parseMsg(msg: Buffer) : void {
        const msgJSON: beaconMsg = JSON.parse(msg.toString());
        if (!ServerData.db.has(msgJSON.name)) {
            this.emit('newServer', msgJSON);
        }
        ServerData.db.set(msgJSON.name, {...msgJSON, date:new Date()});
        
    }
    
    runClient(): void {
        let client = new ADSClient(this._port);
        client.init();
        client.on('server', (msg) => this.parseMsg(msg));
        client.listen();
    }
}
