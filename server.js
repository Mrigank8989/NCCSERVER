const http = require('http');
const app = require('./backend'); // 👈 lowercase here (matches the file name)
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

// ✅ Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down server...');
  server.close(() => process.exit(0));
});
