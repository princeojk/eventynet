import { Module } from '@nestjs/common';
import { SocketClient } from './socketClient';

@Module({
  providers: [SocketClient],
})
export class SocketModule {}
