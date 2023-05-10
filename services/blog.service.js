const blogRepository = require("../repositories/blog.repository");
const userService = require("../services/user.service");
const paginationUtil = require("../utils/pagination.util");
const { AppError } = require("../utils/error.handler.util");
const blogNotFoundMessage = 'No blog found with this id';



export const createBlog = async (body) => {
  const title = body.title;
  const description = body.description;
  const username = String(body.username);
  const authorResponse = await userService.getUserByUsername(username);
  const authorId = authorResponse.user.id;

  const newBlog = await blogRepository.createBlog(
    title,
    description,
    authorId,
  );
  return newBlog;
};

export const getAllBlogs =async (query) => {
  const pageNumber = paginationUtil.getPageNumber(query.page);
  const pageSize = paginationUtil.getPageSize(query.limit);
  const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
  const pageLimit = paginationUtil.getPageLimit(pageSize);
  const result = await blogRepository.getAllBlogs(pageOffset, pageLimit);
  return result.blogs;
};

export const countAllBlogs = async() =>{
  const defaultPage =1;
  const defaultLimit =5;
  const pageNumber = paginationUtil.getPageNumber(defaultPage);
  const pageSize = paginationUtil.getPageSize(defaultLimit);
  const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
  const pageLimit = paginationUtil.getPageLimit(pageSize);
  const result = await blogRepository.getAllBlogs(pageOffset, pageLimit);
  return result.count;
}

export const getBlogsByAuthorId = async (query, authorId) => {
  const pageNumber = paginationUtil.getPageNumber(query.page);
  const pageSize = paginationUtil.getPageSize(query.limit);
  const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
  const pageLimit = paginationUtil.getPageLimit(pageSize);
  const result = await blogRepository.getBlogsByAuthorId(
    pageOffset, pageLimit, authorId
  );
  if (!result) {
    throw new AppError(blogNotFoundMessage, 404);
  }
  return result.blogs;
};

export const countBlogsByAuthorId = async (authorId) => {
  const defaultPage =1;
  const defaultLimit =5;
  const pageNumber = paginationUtil.getPageNumber(defaultPage);
  const pageSize = paginationUtil.getPageSize(defaultLimit);
  const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
  const pageLimit = paginationUtil.getPageLimit(pageSize);
  const result = await blogRepository.getBlogsByAuthorId(
    pageOffset, pageLimit, authorId
  );
  if (!result) {
    throw new AppError(blogNotFoundMessage, 404);
  }
  return result.count;
};


export const getBlogById = async (blogId) => {
  const blogResponse = await blogRepository.getBlogById(blogId);
  if (!blogResponse) {
    throw new AppError(blogNotFoundMessage, 404);
  }
  return blogResponse;
};

export const updateBlogById = async (body, blogId) => {
  const blogResponse = await blogRepository.getBlogById(blogId);
  let title = body.title;
  let description = body.description;
  if (!description) {
    description = blogResponse.description;
  } else if (!title) {
    title = blogResponse.title;
  }
  const updatedAt = Date.now();
  const updatedBlog = await blogRepository.updateBlogById(title, description, updatedAt, blogId);
  return updatedBlog;
};

export const deleteBlogById = async (blogId) => {
  const deleteBlogResponse = blogRepository.deleteBlogById(blogId);
  return deleteBlogResponse;
};


