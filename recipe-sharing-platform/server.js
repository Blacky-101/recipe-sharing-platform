const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const { authenticateToken } = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/recipes', authenticateToken, recipeRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));