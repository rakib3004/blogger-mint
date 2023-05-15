
require("dotenv").config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/index.route');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const cors = require('cors');
app.use(cors(
  {
    // origin: [process.env.CROSS_ORIGIN_1, process.env.CROSS_ORIGIN_2, process.env.CROSS_ORIGIN_3,],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true,

  }
));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", indexRouter);



app.use((err, req, res, next) => {
  if (!err) {
      return next();
  }
 res.status(err.statusCode).send(err.message);
});



app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
    error: {
      message: 'You reached a route that is not defined on this server',
    },
  });
});


app.listen(PORT, HOST, () => {
});