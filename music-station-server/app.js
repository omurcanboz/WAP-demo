const express = require('express');
const userRouter = require('./routes/userRouter');
const songRouter = require('./routes/songRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user' , userRouter);
app.use('/songs', songRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});

app.listen(4000, () => console.log('listening to 4000...'));