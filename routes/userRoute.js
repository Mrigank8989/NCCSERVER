const express = require('express');
const router = express.Router();

const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");
const { addQuestion } = require('../controller/questionController');
const { addQuiz,fetchQuizById } = require('../controller/quizController');

const { addQuizAttempt } = require('../controller/quizAttemptController');

// ─── Authentication Routes ──────────────────────────────────────────────
router.get('/getAllUsers', fetchAllUsers);                  // Get all users
router.post('/SignUp', createUserController);               // Admin Sign Up
router.post('/SignIn', SignIn);                             // Sign In



router.post('/addQuiz', addQuiz);
router.get('/:quiz_id', fetchQuizById);
router.post('/add-question', addQuestion);


router.post('/attempts', addQuizAttempt);

module.exports = router;
