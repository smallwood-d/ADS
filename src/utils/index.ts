import {networkInterfaces} from 'os';

export function getInterfaces(filterFunc?: Function) :(string | undefined)[] {
    const interfaces = networkInterfaces();
    let ips = Array.from(new Set(
                            Object.values(interfaces)
                            .flat()
                            .filter(net => net && net.family === 'IPv4')
                            .map(net => net && net.address)
                            .filter(address => address)));
    
    if (filterFunc)
    {
        ips = ips.filter(ip => filterFunc(ip));
    }
    return ips;
}
