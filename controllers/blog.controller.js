const blogService = require("../services/blog.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");

const getAllBlogs = async (req, res) => {
  try {

    const getAllBlogsResponse = await blogService.getAllBlogs(req.query);
    sendResponseInContentNegotiation(req,res,200,getAllBlogsResponse);
  } catch (err) {
    console.error(err)
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const createBlog = async (req, res) => {
   try {
    req.body.username = req.username;
    const createBlogResponse = await blogService.createBlog(req.body);
    sendResponseInContentNegotiation(req,res,201,createBlogResponse);

  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const getBlogByIdResponse = await blogService.getBlogById(
      req.params.id
    );
    sendResponseInContentNegotiation(req,res,200,getBlogByIdResponse.message);
   
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogByAuthorId = async (req, res) => {
  try {

     const getBlogByAuthorIdResponse = await blogService.getBlogByAuthorId(
      req.params.id
    );
    const responseData = getBlogByAuthorIdResponse;
    return sendResponseInContentNegotiation(req,res,200,responseData);
  } catch (err) {
    console.error(err);
    return res.send({ status: 500, message: "Internal Server Error" });
  }
};

const updateBlogById = async (req, res) => {

  try {
   
    const updateBlogByIdResponse =
      await blogService.updateBlogById(req.body, req.params.id);
      return res.send({status: updateBlogByIdResponse.status, message:updateBlogById.message});
  } catch (err) {
    console.error(err);
    return res.send({ status: 500, message: "Internal Server Error" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.send({ status: 400, message: "Request parameter is empty" });
    }

    const deleteBlogByIdResponse = await blogService.deleteBlogById(
      req.params.id
    );
    return res.status(200).json(deleteBlogByIdResponse);
    
  } catch (err) {
    console.error(err);
    return res.send({ status: 500, message: "Internal Server Error" });
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
