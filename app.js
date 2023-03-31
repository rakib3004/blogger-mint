const express = require("express");
const app = express();
const indexRouter = require("./routes/index.route");
const cookieParser = require('cookie-parser');

require("dotenv").config();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", indexRouter);



app.use((err, req, res, next) => {
  if (!err) {
      return next();
  }
 res.status(err.statusCode);
  res.send(err.message);
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


app.listen(PORT, () => {
  console.log(`Server is running ... ... ... at PORT: ${PORT} `);
});
