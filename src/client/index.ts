import { ADSClient } from "./client";
import cfg from '../resources/cfg.json';

let c = new ADSClient(cfg.C_PORT);

c.init();
c.on('server', (msg) => console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaa", msg));
c.listen();