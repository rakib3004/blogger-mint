const blogService = require("../services/blog.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");
const blogValidationUtil = require("../utils/blog.validation.util");
const { AppError } = require("../utils/error.handler.util");

const getAllBlogs = async (req, res, next) => {
  try {
    const query = req.query;
    const getAllBlogsResponse = await blogService.getAllBlogs(query);
    return sendResponseInContentNegotiation(req,res,200,getAllBlogsResponse);
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blogResponse = await blogService.getBlogById(
      blogId
    );
    return sendResponseInContentNegotiation(req,res,200,blogResponse);
   
  } catch (err) {
    next(err);

  }
};

const getBlogByAuthorId = async (req, res, next) => {
  try {
    const blogId = req.params.id;

     const blogResponse = await blogService.getBlogByAuthorId(blogId);
    return sendResponseInContentNegotiation(req,res,200,blogResponse);
  } catch (err) {
    next(err);
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
   const newBlogResponse = await blogService.createBlog(body);

   const clientResponse = {data:newBlogResponse,message: 'Blog is successfully created'};
   return sendResponseInContentNegotiation(req,res,201,clientResponse);

 } catch (err) {
   next(err);
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

    const updatedBlogResponse =
      await blogService.updateBlogById(body, blogId);

      const clientResponse = {data:updatedBlogResponse,message: 'Blog  is successfully updated' };
      return sendResponseInContentNegotiation(req,res,200,clientResponse);

  } catch (err) {
    next(err);
  }
};

const deleteBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const deletedBlogResponse = await blogService.deleteBlogById(
     blogId
    );

    const clientResponse = {data:deletedBlogResponse,message: 'Blog  is successfully deleted' };
    return sendResponseInContentNegotiation(req,res,200,clientResponse);
    
  } catch (err) {
    next(err);
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
