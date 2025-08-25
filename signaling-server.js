import { WebSocketServer } from 'ws'; // ✅ Correct import in ESM

const wss = new WebSocketServer({ port: 3001 });



wss.on("connection", function connection(ws) {
  console.log("Client connected to signaling server");

  ws.on("message", function incoming(message) {
    console.log("Received:", message);
    // Broadcast to all other clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
const WebSocket = require('ws');


const clients = new Map();

wss.on('connection', (ws) => {
  let userId = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'register') {
      userId = data.userId;
      clients.set(userId, ws);
      console.log(`User registered: ${userId}`);
      return;
    }

    // Relay signaling message
    if (data.type === 'signal' && data.target) {
      const targetWs = clients.get(data.target);
      if (targetWs) {
        targetWs.send(JSON.stringify({
          type: 'signal',
          from: userId,
          data: data.data
        }));
      }
    }
  });

  ws.on('close', () => {
    if (userId) {
      clients.delete(userId);
      console.log(`User disconnected: ${userId}`);
    }
  });
});

console.log("Signaling server running on ws://localhost:3001");

console.log("🚀 Signaling server starting...");