import dgram, { Socket } from 'dgram';
import { Buffer } from 'buffer';

import cfg from '../resources/cfg.json';

const client: Socket = dgram.createSocket('udp4');

client.on('error', (err: any) => {
  console.log(`client error:\n${err.stack}`);
  client.close();
});

client.on('message', (msg: Buffer, rinfo: any) => {
  console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

client.on('listening', () => {
  const address = client.address();
  console.log(`client listening ${address.address}:${address.port}`);
});

client.bind(cfg.C_PORT);
