import dgram, { Socket } from 'dgram';
import EventEmitter from 'events';
import { Buffer } from 'buffer';

import cfg from '../../resources/cfg.json';

export class ADSClient extends EventEmitter{

  private _port: number;
  private client: Socket;
  private interval: NodeJS.Timer;
  private messageHadler: Function;
  private static readonly identityFunc: Function = (i: Buffer) => i.toString();

  constructor(port: number=cfg.S_PORT, messageHadler: Function = ADSClient.identityFunc) {
      super();
      this._port = port;
      this.messageHadler = messageHadler;
  }

  get port(): number{
      return this._port;
  }

  public init() {
      try {
          console.log('connect attempt');
          this.client = dgram.createSocket("udp4");
          this.client.on('error', (err: any) => this.handleError(err));
          this.client.on('close', this.handleClose);
          this.client.on('message',(msg: Buffer, rinfo: any) => this.handleMessage(msg, rinfo));
              
          this.client.on('listening', () => {
              const address = this.client.address();
              console.log(`client listening ${address.address}:${address.port}`);
          });
          clearInterval(this.interval);
      } catch (err) {
          console.log(`fail toconnect to the ADS socket ${err}`);
      }
  }

  private handleError(err: any) {
    console.log(`Error OMG ${err}`); 
    this.client.close();
  }

  private handleClose() {
    console.log('closing the ADS socket');
    console.log('tring to reconnect...');
    this.interval = setInterval(this.init.bind(this), 5000);
  }

  private handleMessage(msg: Buffer, rinfo: any) {
        console.log(`client got: msg from ${rinfo.address}:${rinfo.port}`);
        this.emit('server', this.messageHadler(msg));
  }
  
  public listen() {
    this.client.bind(this._port);
  }
}
