interface ServerToClientEvents {
noArg: () => void;
basicEmit: (a: number, b: string, c: Buffer) => void;
withAck: (d: string, callback: (e: number) => void) => void;
queueupdated: () => void
}

interface ClientToServerEvents {
hello: () => void;
addsong: (err: any, response: any) => void;
}

interface InterServerEvents {
ping: () => void;
}

interface SocketData {
name: string;
age: number;
}

export {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData}