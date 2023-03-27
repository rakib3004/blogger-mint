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
  if (!Object.keys(req.body).length) {
    return res.send({ status: 400, message: "Request body is empty" });
  }

  try {

    req.body.username = req.username;

    const response = await blogService.createBlog(req.body);

    res.send(response);

  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogById = async (req, res) => {
  try {

    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const getBlogByIdResponse = await blogService.getBlogById(
      req.params.id
    );
    res.status(200).json(getBlogByIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogByAuthorId = async (req, res) => {
  try {

    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const getBlogByAuthorIdResponse = await blogService.getBlogByAuthorId(
      req.params.id
    );
    res.status(200).json(getBlogByAuthorIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const updateBlogById = async (req, res) => {

  if (!Object.keys(req.body).length) {
    return res.send({ status: 400, message: "Request body is empty" });
  }
  try {
    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }
    const updateBlogByIdResponse =
      await blogService.updateBlogById(req.body, req.params.id);
    res.send({status: updateBlogByIdResponse.status, message:updateBlogById.message});
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const deleteBlogByIdResponse = await blogService.deleteBlogById(
      req.params.id
    );
    res.status(200).json(deleteBlogByIdResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};





module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
  
};
