import dgram, { Socket } from 'dgram';
import { Buffer } from 'buffer';

import { getInterfaces } from '../utils';
import cfg from '../resources/cfg.json';

const ips = getInterfaces();
const server: Socket = dgram.createSocket("udp4"); 

server.bind(cfg.S_PORT, () => {
    server.setMulticastTTL(3);
});

setInterval(broadcastNew, 3000);

function broadcastNew() {
    const message = Buffer.from('Some bytes');
    const sendMsg = (ip: string) => {
        server.send(message, cfg.C_PORT, ip, (err: any) => {
        if (err) {
            console.log(`Error OMNG ${err}`);
            console.log(`Closing the socket`);
            server.close();
        }
        console.log(`send msg to clinets...`);               
      });
    }
    ips.forEach((ip) => ip && sendMsg(ip));
    console.log("Sent " + message + " to the wire...");
}


