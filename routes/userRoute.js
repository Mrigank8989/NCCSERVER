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

// ─── QUIZ ATTEMPT ROUTES (must come BEFORE /:quiz_id) ────────
router.post('/attempts', addQuizAttempt);

router.get('/attempts', async (req, res) => {
  const { user_id } = req.query;

  // Always return array, even on error
  if (!user_id) {
    return res.status(200).json([]);
  }

  try {
    const result = await pool.query(
      'SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY attempt_date DESC',
      [user_id]
    );

    return res.status(200).json(result.rows || []);

  } catch (error) {
    console.error("❌ Error fetching quiz attempts:", error);

    // 🔥 IMPORTANT: Always return array
    return res.status(200).json([]);
  }
});
  // ===== ADMIN: Get all attempts with user info =====
router.get('/admin/attempts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        qa.attempt_id,
        qa.user_id,
        u.username,
        u.full_name,
        qa.quiz_id,
        qa.score,
        qa.correct,
        qa.wrong,
        qa.unanswered,
        qa.total_questions,
        qa.percentage,
        qa.time_taken,
        qa.snapshot,
        qa.attempt_date,
        qa.is_completed
      FROM quiz_attempts qa
      JOIN users u ON qa.user_id = u.user_id
      ORDER BY qa.attempt_date DESC
    `);

    res.status(200).json(result.rows || []);
  } catch (err) {
    console.error("❌ Error fetching admin attempts:", err);
    res.status(500).json([]);
  }
});
    // ===== ADMIN: Delete attempt =====
router.delete('/admin/attempts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM quiz_attempts WHERE attempt_id = $1", [id]);

    res.status(200).json({ message: "Attempt deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting attempt:", err);
    res.status(500).json({ message: "Failed to delete attempt" });
  }
});



// ─── QUIZ ROUTES ───────────────────────────────────────────────
router.post('/addQuiz', addQuiz);
router.post('/add-question', addQuestion);

// 🚨 FINAL SAFETY: block non-numeric quiz_id BEFORE calling controller
router.get('/:quiz_id', (req, res, next) => {
  if (isNaN(req.params.quiz_id)) {
    return res.status(400).json({ message: "Invalid quiz ID" });
  }
  next();
}, fetchQuizById);

module.exports = router;
