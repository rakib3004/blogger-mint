const blogRepository = require("../repositories/blog.repository");
const commonUtil = require("../utils/common.util");
const userService = require("../services/user.service");
const paginationUtil = require("../utils/pagination.util");
const blogValidationUtil = require("../utils/blog.validation.util");
const { AppError } = require("../utils/error.handler.util");
const blogNotFoundMessage = 'No blog found with this author id';


const getAllBlogs = (query) => {
    const pageNumber = paginationUtil.getPageNumber(query.page);
    const pageSize = paginationUtil.getPageSize(query.limit);
    const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
    const pageLimit = paginationUtil.getPageLimit(pageSize);
    return blogRepository.getAllBlogs(pageOffset, pageLimit);
 
};

const createBlog = async (body) => {
    const id = commonUtil.generateUUID();
    const title = body.title;
    const description = body.description;
    const username = String(body.username);
    const authorResponse = await userService.getUserByUsername(username);

    const ValidBlogBody = blogValidationUtil.checkValidBlogBody(body);

    if (!ValidBlogBody.valid) {
      throw new AppError(ValidBlogBody.message, 400);
    }

    const authorId = authorResponse.user.id;
    const createdAt = commonUtil.formatUnixTimestamp(Date.now());
    const updatedAt = commonUtil.formatUnixTimestamp(Date.now());

    const newBlog = await blogRepository.createBlog(
      id,
      title,
      description,
      authorId,
      createdAt,
      updatedAt
    );

    return { status: 201, message: newBlog };
  
};

const getBlogById = async (blogId) => {
    const blogResponse = await blogRepository.getBlogById(blogId);

    if (!blogResponse) {
      throw new AppError(blogNotFoundMessage,404);
    }
    
    return { status: 200, message: blogResponse, };

};

const getBlogByAuthorId = async (authorId) => {
    const getBlogByAuthorIdResponse = await blogRepository.getBlogByAuthorId(
      authorId
    );

    if (!getBlogByAuthorIdResponse) {
      throw new AppError(blogNotFoundMessage,404);
    }
    return getBlogByAuthorIdResponse;
 
};

const updateBlogById = async (body, blogId) => {

    const emptyTitleAndDescription = blogValidationUtil.checkEmptyTitleAndDescription(blogId);

    if (emptyTitleAndDescription.isEmpty) {
      throw new AppError(checkValidUpdateBlog.message,400);
    }

    let title = body.title;
    let description = body.description;
    if (!description) {
      description = blogResponse.description;
    } else if (!title) {
      title = blogResponse.title;
    }

    const blogResponse = await blogRepository.getBlogById(blogId);

    if (!blogResponse) {
      throw new AppError(blogNotFoundMessage,404);

    }

    const updatedBlog = blogRepository.updateBlogById(title, description, blogId);
  

    if (updatedBlog) {
      return { status: 200, message: 'Blog  is updated successfully' };
    }

    throw new AppError( 'Failed to update blog',500);


};

const deleteBlogById = async (blogId) => {

    const validBlogId = blogValidationUtil.checkValidId(authorId);

    if (!validBlogId.valid) {
      return { status: 400, message: validBlogId.message };
    }

    const blogResponse = await blogRepository.getBlogById(blogId);

    if (!blogResponse) {
      throw new AppError(blogNotFoundMessage,404);

    }
    const deleteBlogResponse = blogRepository.deleteBlogById(blogId);
    return {
      status: 200,
      message: 'Blog is successfully deleted',
    };

};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
};
