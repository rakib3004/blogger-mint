const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const PORT = process.env.SERVER_PORT;
require("dotenv").config();
const databaseConfig = require("./configs/database.config");

databaseConfig.connectToDatabase();

app.use(express.json());

app.use("/users", userRouter);

app.use((err, req, res, next) => {
  if (!err) {
    return next();
}
res.send('Internal server error');
});


app.listen(PORT, () => {
  console.log(`Server is running ... ... ... at PORT: ${PORT} `);
});
