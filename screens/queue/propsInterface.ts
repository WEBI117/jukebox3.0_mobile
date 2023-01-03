import { io, Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from '../../interfaces/socketInterfaces';

export default interface queueScreenProps {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
    setSocket: React.Dispatch<React.SetStateAction<Socket<ServerToClientEvents, ClientToServerEvents> | null>>
    socketURL: string
    serverURL: string
}