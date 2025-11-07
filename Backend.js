const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Proper CORS Configuration
const allowedOrigins = [
  'https://nccproject.onrender.com', // your frontend (Render)
  'http://localhost:5173',           // local dev
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // ✅ Handle preflight properly
  }
  next();
});

// ✅ Routes
app.use('/api', userRoutes);

// ✅ Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Health Check Route (very important for Render)
app.get('/', (req, res) => {
  res.status(200).send('✅ NCC Server is running and healthy.');
});

// ✅ 404 Fallback (optional, prevents blank responses)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
