// controller/quizAttemptController.js
const { insertQuizAttempt } = require('../module/quizAttemptModel');
const pool = require('../config/db');

const addQuizAttempt = async (req, res) => {
  try {
    console.log("📩 Received attempt data:", req.body);

    const { user_id, quiz_id, score } = req.body;

    if (!user_id || !quiz_id || score === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // ✅ Log connection check
    console.log("🔍 Checking existing attempt for user:", user_id, "quiz:", quiz_id);

    const existingAttempt = await pool.query(
      "SELECT * FROM quiz_attempts WHERE user_id = $1 AND quiz_id = $2",
      [user_id, quiz_id]
    );

    console.log("🧾 Existing attempt rows:", existingAttempt.rows);

    // (Optional) allow multiple attempts for now
    const result = await insertQuizAttempt({
      user_id,
      quiz_id,
      score
    });

    console.log("✅ Quiz attempt inserted successfully:", result);

    res.status(201).json({
      message: "Quiz attempt recorded successfully",
      result
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
