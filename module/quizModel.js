// models/quizModel.js
const pool = require('../config/db');

async function insertQuiz(quiz) {
  try {
    const query = `
      INSERT INTO quizzes (difficulty, set_number, title)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [
      quiz.difficulty,
      quiz.set_number,
      quiz.title
    ];

    const result = await pool.query(query, values);
    return result.rows[0]; // return the inserted quiz
  } catch (error) {
    throw error;
  }
}

async function getQuizById(quiz_id) {
  try {
    const query = 'SELECT * FROM quizzes WHERE quiz_id = $1';
    const result = await pool.query(query, [quiz_id]);
    return result.rows[0]; // single quiz
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertQuiz,
  getQuizById
};
