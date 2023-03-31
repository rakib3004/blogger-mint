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
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blogResponse = await blogService.getBlogById(
      blogId
    );
    sendResponseInContentNegotiation(req,res,200,blogResponse);
   
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
   sendResponseInContentNegotiation(req,res,201,{data:newBlogResponse,message: 'Blog is created successfully'});

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

      return res.status(200).send({data:updatedBlogResponse,message: 'Blog  is updated successfully' });
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
    return res.status(200).send({data:deletedBlogResponse,message: 'Blog is deleted successfully' });
    
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
