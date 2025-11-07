
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 0, // keep connection alive
  connectionTimeoutMillis: 0
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected and alive"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;

// config/db.js

