// models/quizAttemptModel.js
const pool = require('../config/db');

const insertQuizAttempt = async (attemptData) => {
  const query = `
    INSERT INTO quiz_attempts 
      (user_id, quiz_id, score, correct, wrong, unanswered, total_questions, percentage, time_taken, snapshot, attempt_date, is_completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;

  const values = [
    attemptData.user_id,
    attemptData.quiz_id,
    attemptData.score,
    attemptData.correct,
    attemptData.wrong,
    attemptData.unanswered,
    attemptData.total_questions,
    attemptData.percentage,
    attemptData.time_taken,
    attemptData.snapshot || null,
    attemptData.attempt_date || new Date(),
    attemptData.is_completed
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


module.exports = {
  insertQuizAttempt
};
