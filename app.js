const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const userRouter = require("./routes/user.route");
const PORT = process.env.SERVER_PORT;

app.use(express.json());

app.use("/users", userRouter);

app.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    var valErrors = [];
    valErrors.push("Internal Server Error");
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(500).send(valErrors);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running ... ... ... at PORT: ${PORT} `);
});
