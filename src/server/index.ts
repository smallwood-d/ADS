import cfg from '../resources/cfg.json';
import { ADSServer } from "./server";

let s = new ADSServer(cfg.S_PORT);

s.init();
s.brodcastLoop("hello", 3000);