const blogRepository = require("../repositories/blog.repository");
const commonUtil = require("../utils/common.util");
const userService = require("../services/user.service");
const paginationUtil = require("../utils/pagination.util");
const { AppError } = require("../utils/error.handler.util");
const blogNotFoundMessage = 'No blog found with this id';


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
    return newBlog ;
  
};


const getBlogByAuthorId = async (authorId) => {
    const blogResponse = await blogRepository.getBlogByAuthorId(
      authorId
    );
    if (!blogResponse) {
      throw new AppError(blogNotFoundMessage,404);
    }
    return blogResponse;
};


const getBlogById = async (blogId) => {
  const blogResponse = await blogRepository.getBlogById(blogId);
  if (!blogResponse) {
    throw new AppError(blogNotFoundMessage,404);
  }
  return blogResponse;
};

const updateBlogById = async (body, blogId) => {
  const blogResponse = await blogRepository.getBlogById(blogId);
    let title = body.title;
    let description = body.description;
    if (!description) {
      description = blogResponse.description;
    } else if (!title) {
      title = blogResponse.title;
    }
    const updatedAt = commonUtil.formatUnixTimestamp(Date.now());
    const updatedBlog = await blogRepository.updateBlogById(title, description, updatedAt, blogId);
    return updatedBlog;
};

const deleteBlogById = async (blogId) => {
    const deleteBlogResponse = blogRepository.deleteBlogById(blogId);
    return deleteBlogResponse;
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
};
