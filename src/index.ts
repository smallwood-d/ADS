import cfg from './resources/cfg.json';
import { ADSServer, ADSClient } from "./MulticastBeacon";

let s = new ADSServer(cfg.S_PORT);

s.init();
s.brodcastLoop("hello", 3000, ["localhost"]);



let c = new ADSClient(cfg.C_PORT);

c.init();
c.on('server', (msg) => console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaa", msg));
c.listen();
