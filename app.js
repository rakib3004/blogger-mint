const express = require("express");
const app = express();
const indexRouter = require("./routes/index.route");
const cookieParser = require('cookie-parser')
const PORT = process.env.SERVER_PORT;
require("dotenv").config();
app.use(express.json());
app.use(cookieParser())
app.use("/", indexRouter);


app.use((err, req, res, next) => {
  if (!err) {
    return next();
}
res.send('Internal server error');
});

app.listen(PORT, () => {
  console.log(`Server is running ... ... ... at PORT: ${PORT} `);
});
