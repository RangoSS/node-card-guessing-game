const express = require('express');
const fs = require('fs');
const router = express.Router();
const scoresPath = './data/scores.json';

// Helper function to read scores from JSON file
const readScoresFromFile = () => {
    const data = fs.readFileSync(scoresPath);
    return JSON.parse(data);
};

// Helper function to write scores to JSON file
const writeScoresToFile = (scores) => {
    fs.writeFileSync(scoresPath, JSON.stringify(scores, null, 2));
};

// GET: Retrieve all scores
router.get('/scores', (req, res) => {
    const scores = readScoresFromFile();
    res.json(scores);
});

// POST: Save new score
router.post('/scores', (req, res) => {
    const { username, time } = req.body;

    if (!username || !time) {
        return res.status(400).json({ error: 'Username and time are required.' });
    }

    const scores = readScoresFromFile();
    scores.push({ username, time });
    writeScoresToFile(scores);
    res.status(201).json({ message: 'Score saved successfully!' });
});

module.exports = router;
