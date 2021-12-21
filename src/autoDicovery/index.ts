//import cfg from '../resources/cfg.json'
export {ServerData} from './client';
export {BeaconServer} from './server';

/*
const serverData = new ServerData(cfg.C_PORT);
serverData.runClient();
serverData.on('newServer', (name: string) => console.log(name));

let beaconServer: BeaconServer = new BeaconServer("neta", cfg.S_PORT, cfg.C_PORT);
beaconServer.runServer("call me", 3000);*/