const blogService = require("../services/blog.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");
const blogValidationUtil = require("../utils/blog.validation.util");
const { AppError } = require("../utils/error.handler.util");

const getAllBlogs = async (req, res, next) => {
  try {
    const query = req.query;
    const getAllBlogsResponse = await blogService.getAllBlogs(query);
    sendResponseInContentNegotiation(req,res,200,getAllBlogsResponse);
  } catch (err) {
    console.error(err);  next(err);
  }
};

const createBlog = async (req, res, next) => {
   try {
    const body = req.body;
    const ValidBlogBody = blogValidationUtil.checkValidBlogBody(body);

    if (!ValidBlogBody.valid) {
      throw new AppError(ValidBlogBody.message, 400);
    }


    body.username = req.username;
    const createBlogResponse = await blogService.createBlog(body);
    sendResponseInContentNegotiation(req,res,201,createBlogResponse);

  } catch (err) {
    
    console.error(err);  next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const getBlogByIdResponse = await blogService.getBlogById(
      blogId
    );
    sendResponseInContentNegotiation(req,res,200,getBlogByIdResponse.message);
   
  } catch (err) {
    console.error(err);  next(err);

  }
};

const getBlogByAuthorId = async (req, res, next) => {
  try {
    const blogId = req.params.id;

     const getBlogByAuthorIdResponse = await blogService.getBlogByAuthorId(
      blogId
    );
    const responseData = getBlogByAuthorIdResponse;
    return sendResponseInContentNegotiation(req,res,200,responseData);
  } catch (err) {
    console.error(err);  next(err);
  }
};

const updateBlogById = async (req, res, next) => {

  try {

    const body = req.body;
    const blogId = req.params.id;


    const emptyTitleAndDescription = blogValidationUtil.checkEmptyTitleAndDescription(body);

    if (emptyTitleAndDescription.isEmpty) {
      throw new AppError(emptyTitleAndDescription.message,400);
    }

   
    const updateBlogByIdResponse =
      await blogService.updateBlogById(body, blogId);
      return res.send({status: updateBlogByIdResponse.status, message:updateBlogByIdResponse.message});
  } catch (err) {
    console.error(err);  next(err);
  }
};

const deleteBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    const deleteBlogByIdResponse = await blogService.deleteBlogById(
     blogId
    );
    return res.status(200).json(deleteBlogByIdResponse);
    
  } catch (err) {
    console.error(err);  next(err);
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
