const http = require('http');
const app = require('./Backend');
require('dotenv').config();

// ✅ Use Render's dynamic PORT or fallback to 5000 for local dev
const PORT = process.env.PORT || 5000;

// ✅ Create and start the server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

// ✅ Graceful shutdown handling (optional but good practice)
process.on('SIGTERM', () => {
  console.log('🛑 Server shutting down...');
  server.close(() => process.exit(0));
});
