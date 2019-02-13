const SERVER_FORWARD_HOST_PORT: string = process.env.SERVER_FORWARD_HOST_PORT || '';
const SERVER_HOST_IP: string = process.env.SERVER_HOST_IP || '';

/**
 * Adres serwera
 */
const serverAddress: string = `http://${SERVER_HOST_IP}:${SERVER_FORWARD_HOST_PORT}`;

export { serverAddress };
