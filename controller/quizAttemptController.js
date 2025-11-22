const { insertQuizAttempt } = require('../module/quizAttemptModel');
const pool = require('../config/db');

const addQuizAttempt = async (req, res) => {
  try {
    console.log("📩 Received attempt data:", req.body);

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

    const result = await insertQuizAttempt({
      user_id,
      quiz_id,
      score,
      total_questions,
      percentage,
      time_taken,
      attempt_date,
      is_completed
    });

    console.log("✅ Saved attempt:", result);

    res.status(201).json({
      message: "Quiz attempt recorded successfully",
      attempt: result
    });

  } catch (error) {
    console.error("❌ Error adding quiz attempt:", error);
    res.status(500).json({ 
      message: "Failed to add quiz attempt",
      error: error.message 
    });
  }
};

module.exports = { addQuizAttempt };
