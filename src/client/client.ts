import dgram, { Socket } from 'dgram';
import EventEmitter from 'events';
import { Buffer } from 'buffer';

import cfg from '../resources/cfg.json';

export class ADSClient extends EventEmitter{

  private _port: number;
  private client: Socket;
  private interval: NodeJS.Timer;

  constructor(port: number=cfg.S_PORT) {
      super();
      this._port = port;
  }

  get port(): number{
      return this._port;
  }

  public init() {
      try {
          console.log('connect attempt');
          this.client = dgram.createSocket("udp4"); 
          this.client.on('error', (err: any) => { console.log(`Error OMG ${err}`); this.client.close();});
          this.client.on('close', () => {
              console.log('closing the ADS socket');
              console.log('tring to reconnect...');
              this.interval = setInterval(this.init.bind(this), 5000)});
          this.client.on('message', (msg: Buffer, rinfo: any) => {
              console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
              this.emit('server', msg.toString());
          });
              
          this.client.on('listening', () => {
              const address = this.client.address();
              console.log(`client listening ${address.address}:${address.port}`);
          });
          clearInterval(this.interval);
      } catch (err) {
          console.log(`fail toconnect to the ADS socket ${err}`);
      }
  }
  
  public listen() {
    this.client.bind(this._port);
  }
}
