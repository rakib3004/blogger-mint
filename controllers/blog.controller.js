const blogService = require("../services/blog.service");
const contentNegotiation = require("../utils/content-negotiation.util");
const blogValidationUtil = require("../utils/blog.validation.util");
const { AppError } = require("../utils/error.handler.util");



export const createBlog = async (req, res, next) => {
  try {
    const body = req.body;
    const ValidBlogBody = blogValidationUtil.checkValidBlogBody(body);

    if (!ValidBlogBody.valid) {
      throw new AppError(ValidBlogBody.message, 400);
    }

    body.username = req.username;
    const newBlogResponse = await blogService.createBlog(body);

    const clientResponse = { data: newBlogResponse, message: 'Blog is successfully created' };
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 201, clientResponse);

  } catch (err) {
    next(err);
  }
};


export const getAllBlogs = async (req, res, next) => {
  try {
    const query = req.query;
    const getAllBlogsResponse = await blogService.getAllBlogs(query);
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, getAllBlogsResponse);
  } catch (err) {
    next(err);
  }
};

export const countAllBlogs = async (req, res, next) => {
  try {
    const totalBlogs = await blogService.countAllBlogs();
    const blogCountResponse =  {count:totalBlogs}
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, blogCountResponse);
  } catch (err) {
    console.log(err);

    next(err);
  }
};


export const getBlogsByAuthorId = async (req, res, next) => {
  try {
    const query = req.query;
    const authorId = req.params.id;
    const blogResponse = await blogService.getBlogsByAuthorId(query, authorId);
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, blogResponse);
  } catch (err) {
    next(err);
  }
};

export const countBlogsByAuthorId = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const authorTotalBlogs = await blogService.countBlogsByAuthorId(authorId);

    const blogCountResponse = {count:authorTotalBlogs}
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, blogCountResponse);
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blogResponse = await blogService.getBlogById(
      blogId
    );
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, blogResponse);

  } catch (err) {
    next(err);

  }
};

export const updateBlogById = async (req, res, next) => {

  try {
    const body = req.body;
    const blogId = req.params.id;

    const emptyTitleAndDescription = blogValidationUtil.checkEmptyTitleAndDescription(body);

    if (emptyTitleAndDescription.isEmpty) {
      throw new AppError(emptyTitleAndDescription.message, 400);
    }

    const updatedBlogResponse =
      await blogService.updateBlogById(body, blogId);
    const updatedBlog = await blogService.getBlogById(blogId);
    const clientResponse = { data: updatedBlog, message: 'Blog  is successfully updated' };
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, clientResponse);

  } catch (err) {
    next(err);
  }
};

export const deleteBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const deletedBlogResponse = await blogService.deleteBlogById(
      blogId
    );

    const clientResponse = { message: 'Blog  is successfully deleted' };
    return contentNegotiation.sendResponseInContentNegotiation(req, res, 200, clientResponse);

  } catch (err) {
    next(err);
  }
};


