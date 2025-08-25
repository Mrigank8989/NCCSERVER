const { insertQuiz ,getQuizById} = require('../module/quizModel');

async function addQuiz(req, res) {
  const { difficulty, set_number, title } = req.body;


  try {
    await insertQuiz({ difficulty, set_number, title });
    res.status(201).json({ message: 'Quiz created successfully.' });
  } catch (err) {
    console.error('Error inserting quiz:', err);
    res.status(500).json({ message: 'Failed to insert quiz.' });
  }
}

async function fetchQuizById(req, res) {
  const { quiz_id } = req.params;

  try {
    const quiz = await getQuizById(quiz_id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    res.status(500).json({ message: 'Failed to fetch quiz.' });
  }
}

module.exports = {
  addQuiz,
  fetchQuizById
};
