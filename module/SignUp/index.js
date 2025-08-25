// models/userModel.js
const pool = require('../../config/db');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows; // PostgreSQL returns rows
  } catch (error) {
    console.error('Error fetching all users:', error);
    return { success: false, message: "Failed to fetch users." };
  }
};

// Create a new user
const createUser = async (username, fullName, password, isAdmin = false) => {
  try {
    console.log("User Data Received:", username, fullName, password);

    // Check if username already exists
    const usernameCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (usernameCheck.rows.length > 0) {
      console.log("Username already exists");
      return { success: false, message: "Username already exists. Please choose another." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query(
      `INSERT INTO users (username, password_hash, full_name, is_admin)
       VALUES ($1, $2, $3, $4)`,
      [username, hashedPassword, fullName, isAdmin]
    );

    console.log("User successfully registered.");
    return { success: true, message: "User registered successfully." };
  } catch (error) {
    console.error("Error inserting user:", error);
    return { success: false, message: "Failed to register user." };
  }
};

module.exports = {
  getAllUsers,
  createUser
};
