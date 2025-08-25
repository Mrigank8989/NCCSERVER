  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const userRoutes = require('./routes/userRoute'); // Adjust the path if necessary

  const app = express();

  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger-output.json')
  // Middleware
  app.use(bodyParser.json());

  const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true,              
  };
  app.use(cors(corsOptions));
  // Routes
  app.use('/api', userRoutes);
  

  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

  module.exports = app;
