const http = require('http');
const app = require('./Backend'); 

const dotenv = require('dotenv');


dotenv.config();

const PORT = process.env.PORT;
// Create and start the server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
