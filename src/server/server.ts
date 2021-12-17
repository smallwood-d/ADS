import dgram, { Socket } from 'dgram';
import { Buffer } from 'buffer';

import cfg from '../resources/cfg.json';

const server: Socket = dgram.createSocket("udp4"); 

server.bind(cfg.S_PORT, () => {
    server.setMulticastTTL(3);
});

setInterval(broadcastNew, 3000);

function broadcastNew() {
    const message = Buffer.from('Some bytes');
    server.send(message, cfg.C_PORT,(err: any) => {
        if (err) {
            console.log(`Error OMNG ${err}`);
            console.log(`Closing the socket`);
            server.close();
        }
        console.log(`send msg to clinets...`);               
      });
    console.log("Sent " + message + " to the wire...");
}


