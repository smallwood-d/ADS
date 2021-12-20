import cfg from './resources/cfg.json'
import {ServerData} from './client';
import {runServer} from './server';

const serverData = new ServerData(cfg.C_PORT);
serverData.runClient();
serverData.on('newServer', (name: string) => console.log(name));
runServer(cfg.S_PORT, 3000);