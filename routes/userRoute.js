const pool = require('../config/db'); // ✅ Needed for DB queries
const express = require('express');
const router = express.Router();


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
// ✅ Fetch all quiz attempts by user_id
router.get('/attempts', async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY attempt_date DESC',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    res.status(500).json({ message: 'Failed to fetch quiz attempts' });
  }
});

// ✅ Save new quiz attempt
router.post('/attempts', addQuizAttempt);
// ✅ Fetch quiz attempts for a user
router.get('/attempts', async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY attempt_date DESC',
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching quiz attempts:', error);
    res.status(500).json({ message: 'Error fetching quiz attempts' });
  }
});





module.exports = router;
