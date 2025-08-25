const { insertQuizAttempt } = require('../module/quizAttemptModel');

const addQuizAttempt = async (req, res) => {
  try {
    const {
      user_id,
      quiz_id,
      score,
      total_questions,
      percentage,
      time_taken,
      attempt_date = new Date(),
      is_completed
    } = req.body;

    await insertQuizAttempt({
      user_id,
      quiz_id,
      score,
      total_questions,
      percentage,
      time_taken,
      attempt_date,
      is_completed
    });

    res.status(201).json({ message: 'Quiz attempt recorded successfully' });
  } catch (error) {
    console.error('Error adding quiz attempt:', error);
    res.status(500).json({ message: 'Failed to add quiz attempt' });
  }
};

module.exports = {
  addQuizAttempt
};
