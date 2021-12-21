import { ADSServer } from "../MulticastBeacon";
import { beaconMsg } from "./utils";

export class BeaconServer {

    private readonly serverPort: number;
    private readonly clientPort: number;
    private readonly serverName: string;

    constructor(name: string, serverPort:number, clientPort: number){
        this.serverPort = serverPort;
        this.clientPort = clientPort;
        this.serverName = name;
    }

    protected generateMsg(name: string, userMsg: string): beaconMsg {
        return {name, msg: userMsg};
    }

    public runServer(userMSg: string, intervalTime: number): void {
        let server = new ADSServer(this.serverPort, this.clientPort);
        const msg = JSON.stringify(this.generateMsg(this.serverName, userMSg));
        server.init();
        server.brodcastLoop(msg, intervalTime);
    }
}

