// models/quizAttemptModel.js
const pool = require('../config/db');

const insertQuizAttempt = async (attemptData) => {
  const query = `
    INSERT INTO quiz_attempts 
      (user_id, quiz_id, score, attempted_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;

  const values = [
    attemptData.user_id,
    attemptData.quiz_id,
    attemptData.score
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { insertQuizAttempt };
