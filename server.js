const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Proper CORS configuration for both Render & localhost
app.use(cors({
  origin: [
    'https://nccproject.onrender.com', // Deployed frontend
    'http://localhost:5173',           // Local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ API Routes
app.use('/api', userRoutes);

// ✅ Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Health check route (helps check backend status quickly)
app.get('/', (req, res) => {
  res.send('✅ NCC Server is running and healthy.');
});

module.exports = app;
