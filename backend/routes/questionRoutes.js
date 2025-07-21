const express = require('express');
const { 
    togglePinQuestion, 
    updateQuestionNote, 
    addQuestionsToSession 
} = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected question routes
router.post('/add', protect, addQuestionsToSession);          // Add new questions to session
router.post('/:id/pin', protect, togglePinQuestion);         // Toggle pin status
router.post('/:id/note', protect, updateQuestionNote);       // Update question notes

module.exports = router;