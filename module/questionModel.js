// models/questionModel.js
const pool = require('../config/db');

const insertQuestion = async (questionData) => {
  const query = `
    INSERT INTO questions 
      (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    questionData.quiz_id,
    questionData.question_text,
    questionData.option_1,  // renamed to option_a in DB
    questionData.option_2,  // renamed to option_b in DB
    questionData.option_3,  // renamed to option_c in DB
    questionData.option_4,  // renamed to option_d in DB
    questionData.correct_option
  ];

  const result = await pool.query(query, values);
  return result.rows[0]; // PostgreSQL returns rows
};

module.exports = {
  insertQuestion
};
