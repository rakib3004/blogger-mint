const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.route');

const PORT = process.env.SERVER_PORT;
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use('/', indexRouter);
app.use((err, res, next) => {
    if (!err) {
        return next();
    }
    return res.send('Internal server error');
});

app.listen(PORT, () => {
    console.log(`Server is running ... ... ... at PORT: ${PORT} `);
});
