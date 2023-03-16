const blogService = require("../services/blog.service");

const getAllBlogs = async (req, res) => {
  try {
    const getAllBlogsResponse = await blogService.getAllBlogs();
    res.status(200).json(getAllBlogsResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const createBlog = async (req, res) => {
  try {
    const newBlog = await blogService.createBlog(req.body);

    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogByBlogId = async (req, res) => {
  try {
    const getBlogByBlogIdResponse = await blogService.getBlogByBlogId(
      req.params.id
    );
    res.status(200).json(getBlogByBlogIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};


const updateBlogByBlogId = async (req, res) => {
  try {
    const updateBlogByBlogIdResponse =
      await blogService.updateBlogByBlogId(req.body, req.params.id);
    res.status(200).json(updateBlogByBlogIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const deleteBlogByBlogId = async (req, res) => {
  try {
    const deleteBlogByBlogIdResponse = await blogService.deleteBlogByBlogId(
      req.params.id
    );
    res.status(200).json(deleteBlogByBlogIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};





module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlogByBlogId,
  deleteBlogByBlogId,
  
};
