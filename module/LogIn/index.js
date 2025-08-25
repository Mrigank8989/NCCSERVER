// models/authModel.js
const pool = require('../../config/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const loginUser = async (username, password) => {
  try {
    // Query PostgreSQL
    const userQuery = await pool.query(
      `SELECT 
         user_id,
         username,
         full_name,
         password_hash,
         is_admin
       FROM users
       WHERE username = $1`,
      [username]
    );

    if (userQuery.rows.length === 0) {
      return { success: false, message: "User not found." };
    }

    const user = userQuery.rows[0];

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials." };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      message: "Login successful!",
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        full_name: user.full_name,
        is_admin: user.is_admin,
        accessToken: token
      },
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { success: false, message: "Login failed.", error: error.message };
  }
};

module.exports = {
  loginUser,
};
