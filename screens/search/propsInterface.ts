import { io, Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from '../../interfaces/socketInterfaces';

export default interface searchScreenProps {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
    serverURL: string
}