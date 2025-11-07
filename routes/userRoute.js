const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // ✅ Needed for DB queries

// ─── Controllers ──────────────────────────────────────────────
const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");
const { addQuestion } = require('../controller/questionController');
const { addQuiz, fetchQuizById } = require('../controller/quizController');
const { addQuizAttempt } = require('../controller/quizAttemptController');

// ─── AUTHENTICATION ROUTES ─────────────────────────────────────
router.get('/getAllUsers', fetchAllUsers);
router.post('/SignUp', createUserController);
router.post('/SignIn', SignIn);

// ─── QUIZ ROUTES ──────────────────────────────────────────────
router.post('/addQuiz', addQuiz);
router.get('/:quiz_id', fetchQuizById);
router.post('/add-question', addQuestion);

// ─── QUIZ ATTEMPT ROUTES ──────────────────────────────────────

// ✅ Save new quiz attempt
router.post('/attempts', addQuizAttempt);

// ✅ Get all attempts for a specific user (used by dashboard)
router.get('/attempts', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "Missing user_id in query" });
  }

  try {
    const result = await pool.query(
      `SELECT qa.attempt_id, qa.quiz_id, q.title AS quiz_title, qa.score, 
              qa.total_questions, qa.percentage, qa.time_taken, qa.attempt_date
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.quiz_id
       WHERE qa.user_id = $1
       ORDER BY qa.attempt_date DESC`,
      [user_id]
    );

    console.log(`📤 Sent ${result.rows.length} attempts for user_id ${user_id}`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching user attempts:", error);
    res.status(500).json({ message: "Failed to fetch quiz attempts", error: error.message });
  }
});

module.exports = router;
