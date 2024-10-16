const express = require('express');
const fs = require('fs');
const cors = require('cors');
const gameRouter = require('./routes/game');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/game', gameRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
