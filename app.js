require("dotenv").config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/index.route');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
const cors = require('cors');

app.use(morgan('dev'))
app.use("/api/v1", indexRouter);


app.use(cors(
  {
    origin: ['http://localhost:5173','http://127.0.0.1:5173', process.env.CROSS_ORIGIN_1, process.env.CROSS_ORIGIN_2,process.env.CROSS_ORIGIN_3,],
    // origin: '*',
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,

    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    // exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  },
  console.log("----uiiu----")
));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });
// app.use(cors())
app.use(cookieParser());
app.use(express.json());

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

app.listen( PORT, HOST, () => {
  console.log('---log---',HOST, PORT);
});
