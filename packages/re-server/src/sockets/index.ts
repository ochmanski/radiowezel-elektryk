import { Server as httpServer } from 'http';
import SocketIO, {
  ServerOptions,
} from 'socket.io';

const defaultOptions: ServerOptions = {
  path: 'test',
};

// Nie pytaj
/* tslint:disable:no-any */
// @ts-ignore
export const io: any = (
  server: httpServer,
  options: ServerOptions = defaultOptions,
): SocketIO.Server => (
  SocketIO(server, options)
);
