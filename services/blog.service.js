const blogRepository = require("../repositories/blog.repository");
const commonUtil = require("../utils/common.util");
const userService = require("../services/user.service");
const paginationUtil = require("../utils/pagination.util");
const blogValidationUtil = require("../utils/blog.validation.util");
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
    return { status: 400, message: ValidBlogBody.message };
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
    return {status: 404,message: blogNotFoundMessage,};
  }
  return {status: 200,message: blogResponse,};

};

const getBlogByAuthorId = async (authorId) => {

  
  const getBlogByAuthorIdResponse = await blogRepository.getBlogByAuthorId(
    authorId
  );

  if (!getBlogByAuthorIdResponse) {
    return {
      status: 404,
      message: blogNotFoundMessage,
    };
  }
  return getBlogByAuthorIdResponse;
};

const updateBlogById = async (body, blogId) => {

 
  const emptyTitleAndDescription = blogValidationUtil.checkEmptyTitleAndDescription(blogId);

  if (emptyTitleAndDescription.isEmpty) {
    return { status: 400, message: checkValidUpdateBlog.message };
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
    return {
      status: 404,
      message: blogNotFoundMessage,
    };
  }

  const updatedBlog = blogRepository.updateBlogById(title, description, blogId);
  if (updatedBlog) {
    return { status: 200, message: `Blog body is updated successfully` };
  }

  return { status: 500, message: "Failed to update blog" };
};

const deleteBlogById = async (blogId) => {


  const validBlogId = blogValidationUtil.checkValidId(authorId);
  
  if (!validBlogId.valid) {
    return { status: 400, message: validBlogId.message };
  }

  const blogResponse = await blogRepository.getBlogById(blogId);

  if (!blogResponse) {
    return {
      status: 404,
      message: blogNotFoundMessage,
    };
  }

  const deleteBlogResponse = blogRepository.deleteBlogById(blogId);
  return {
    status: 200,
    message: `'${blogResponse.title}' is successfully deleted`,
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
