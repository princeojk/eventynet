import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventPriceChange } from 'src/event/dto/eventPriceChange.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('updatePrice')
  onUpdatePrice(@MessageBody() body: EventPriceChange) {
    console.log(body);
    this.server.emit('onPriceChange', {
      body,
    });
  }
}
