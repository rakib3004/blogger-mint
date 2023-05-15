const router = require("express").Router();
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const blogRouter = require("./blog.route");


router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/blogs", blogRouter);
router.use("/healthz",(req,res)=>{
res.status(200).send("OK");
})
module.exports = router;
