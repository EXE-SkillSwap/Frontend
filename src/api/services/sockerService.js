import { Client } from "@stomp/stompjs";

const connectSocket = (onMessageReceived) => {
  const client = new Client({
    brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
    connectHeaders: {},
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/user/chat/queue/messages`, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          onMessageReceived(parsedMessage);
        } catch (error) {
          console.error(error);
          onMessageReceived(message.body);
        }
      });
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
  });
  client.activate();
};

export default connectSocket;
