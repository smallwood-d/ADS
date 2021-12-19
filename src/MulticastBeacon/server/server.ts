import dgram, { Socket } from 'dgram';
import { Buffer } from 'buffer';

import { getInterfaces } from '../utils';
import cfg from '../../resources/cfg.json';

export class ADSServer{

    private _port: number;
    private _clientPort: number;
    private server: Socket;
    private interval: NodeJS.Timer;
    private static readonly ips = getInterfaces();

    constructor(serverPort: number=cfg.S_PORT, clientPort: number=cfg.C_PORT) {
            this._port = serverPort;
            this._clientPort = clientPort;
    }

    get port(): number{
        return this._port;
    }
    
    get clientPort(): number{
        return this._clientPort;
    }

    public init() {
        try {
            console.log('connect attempt');
            this.server = dgram.createSocket("udp4"); 
            this.server.bind(this._port, () => {
                this.server.setMulticastTTL(3);
                this.server.on('error', (err: any) => { console.log(`Error OMG ${err}`); this.server.close();});
                this.server.on('close', () => {
                    console.log('closing the ADS socket');
                    console.log('tring to reconnect...');
                    this.interval = setInterval(this.init.bind(this), 5000)});
            });
            clearInterval(this.interval);
        } catch (err) {
            console.log(`fail toconnect to the ADS socket ${err}`);
        }
    }
    
    public brodcast(msg: string, targets?: string | string[]) {
        this.sendBrodcast(msg, targets);
    }

    public brodcastLoop(msg: string, intervalTime: number, targets?: string[]){
        setInterval(this.sendBrodcast.bind(this), intervalTime, msg, targets);
    }
    
    private sendMsg(ip: string, msg: string) {
        const message = Buffer.from(msg);
        this.server.send(message, this._clientPort, ip, (err: any) => {
        if (err) {
            console.log(`Error OMNG ${err}`);
            console.log(`Closing the socket`);
            this.server.close();
        }
        console.log(`send msg to ${ip}:${this._clientPort}...`);               
      });
    }

    private sendBrodcast(msg: string, targets?: string | string[]) {
        const targetIPs = (targets && (Array.isArray(targets) ? targets : [targets])) || ADSServer.ips;
        targetIPs.forEach((ip) => ip && this.sendMsg(ip, msg));
        console.log("Brodacst...");
    }
}
