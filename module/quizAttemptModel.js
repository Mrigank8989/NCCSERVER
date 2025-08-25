// models/quizAttemptModel.js
const pool = require('../config/db');

const insertQuizAttempt = async (attemptData) => {
  const query = `
    INSERT INTO quiz_attempts 
      (user_id, quiz_id, score, total_questions, percentage, time_taken, attempt_date, is_completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const values = [
    attemptData.user_id,
    attemptData.quiz_id,
    attemptData.score,
    attemptData.total_questions,
    attemptData.percentage,
    attemptData.time_taken,
    attemptData.attempt_date || new Date(),
    attemptData.is_completed
  ];

  const result = await pool.query(query, values);
  return result.rows[0]; // PostgreSQL returns rows array
};

module.exports = {
  insertQuizAttempt
};
