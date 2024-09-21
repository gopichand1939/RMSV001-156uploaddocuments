const express = require('express');
const path = require('path');
const app = express();
const uploadRouter = require('./routes/upload');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

const PORT = process.env.PORT || 30001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
