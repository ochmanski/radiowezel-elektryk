import { Socket, Server } from 'socket.io';

export default (io: Server): void => {
  io.on('connection', (s: Socket) => {
    io.emit('news', { hello: 'world' });
    console.log('New client connected');
  });
};
