import { ADSServer } from "./MulticastBeacon";
import {beaconMsg, getIP} from './utils'

function generateMsg(name: string, port: number): beaconMsg {
    let msg : beaconMsg = {ip: getIP(), port, name};
    return msg;
}

export function runServer(port: number, intervalTime: number): void {
    let server = new ADSServer(port);
    const msg = JSON.stringify(generateMsg("someserver", port));
    server.init();
    server.brodcastLoop(msg, intervalTime);
}

