import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class RealtimeGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        this.server.emit('user-joined', {
            socketId: client.id,
            timestamp: new Date(),
        });
    }

    handleDisconnect(client: Socket) {
        this.server.emit('user-left', {
            socketId: client.id,
            timestamp: new Date(),
        });
    }

    @SubscribeMessage('file-change')
    handleFileChange(@MessageBody() payload: any) {
        this.server.emit('file-change', {
            ...payload,
            timestamp: new Date(),
        });
    }

    @SubscribeMessage('cursor-update')
    handleCursorUpdate(@MessageBody() payload: any) {
        this.server.emit('cursor-update', payload);
    }
}
