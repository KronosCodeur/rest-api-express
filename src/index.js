const express = require('express');
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const auth = require("./middleware/authMiddleware");
const eventRoutes = require("./routes/eventRoutes");
const app = express();
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api',auth,todoRoutes);
app.use('/api',auth,eventRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenue dans notre API!' });
});

app.listen(3000,()=> console.log('Server is running on http://localhost:3000'));