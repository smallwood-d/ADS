export function getIP() {
    return "localhost";
}

export interface beaconMsg {
    ip: string,
    port: number,
    name: string
}