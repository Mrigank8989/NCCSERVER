const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Controllers
const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");
const { addQuestion } = require('../controller/questionController');
const { addQuiz, fetchQuizById } = require('../controller/quizController');
const { addQuizAttempt } = require('../controller/quizAttemptController');

// ─── AUTH ROUTES ───────────────────────────────────────────────
router.get('/getAllUsers', fetchAllUsers);
router.post('/SignUp', createUserController);
router.post('/SignIn', SignIn);

// ─── QUIZ ATTEMPT ROUTES (⚠️ MUST COME BEFORE /:quiz_id) ───────
router.post('/attempts', addQuizAttempt);

router.get('/attempts', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY attempt_date DESC',
      [user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching quiz attempts:", error);
    res.status(500).json({ message: "Failed to fetch user quiz attempts" });
  }
});

// ─── QUIZ ROUTES ───────────────────────────────────────────────
router.post('/addQuiz', addQuiz);
router.post('/add-question', addQuestion);
router.get('/:quiz_id', fetchQuizById); // ⚠️ This must always stay LAST

module.exports = router;
