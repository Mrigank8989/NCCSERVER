const { insertQuestion } = require('../module/questionModel');
const pool = require('../config/db'); // PostgreSQL pool

const addQuestion = async (req, res) => {
  try {
    const {
      quiz_id,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option
    } = req.body;

    await insertQuestion({
      quiz_id,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option
    });

    // Update the total_questions in the quizzes table
    await pool.query(
      `UPDATE quizzes
       SET total_questions = total_questions + 1
       WHERE quiz_id = $1`,
      [quiz_id]
    );

    res.status(201).json({ message: 'Question added and quiz updated successfully' });

  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ message: 'Failed to insert question' });
  }
};

module.exports = {
  addQuestion
};
