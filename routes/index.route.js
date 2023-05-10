const router = require("express").Router();
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const blogRouter = require("./blog.route");


router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/blogs", blogRouter);

module.exports = router;
