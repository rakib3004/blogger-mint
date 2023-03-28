const blogRepository = require("../repositories/blog.repository");
const commonUtil = require("../utils/common.util");
const userService = require("../services/user.service");
const paginationUtil = require("../utils/pagination.util");


const getAllBlogs = (pageNumber,pageSize) => {
  const pageOffset = paginationUtil.getPageOffset(pageNumber,pageSize)
  const pageLimit = paginationUtil.getPageLimit(pageSize);
  
  return blogRepository.getAllBlogs(pageOffset,pageLimit);
};

const createBlog = async (body) => {
  const id = commonUtil.generateUUID();
  const title = body.title;
  const description = body.description;
  const username = String(body.username);
  const authorResponse = await userService.getUserByUsername(username);

  const authorId = authorResponse.user.id;


  if (!title) {
    return { status: 400, message: "title Field is Empty" };
  }

  if (!description) {
    return { status: 400, message: "description Field is Empty" };
  }

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

  if (newBlog) {
    return { status: 201, message: newBlog };
  } 
    return { status: 500, message: "Failed to create new blog" };
};

const getBlogById = async (blogId) => {
  const result = await blogRepository.getBlogById(blogId);

  const errorMessage = {"message":"No blog found with this id"};

  if (!result) {
    return {
      status: 404,
      message: errorMessage,
    };
  } 
  return {
    status: 200,
    message: result,
  };

};

const getBlogByAuthorId = async (authorId) => {
  const result = await blogRepository.getBlogByAuthorId(authorId);

  if (!result) {
    return {
      status: 404,
      message: `No blog found with this author id`,
    };
  }
    return result;

};

const updateBlogById = async (body, blogId) => {
  let title = body.title;
  let description = body.description;


  const result = await blogRepository.getBlogById(blogId);
  if (!result) {
    return {
      status: 404,
      message: `No blog found with this id`,
    };
  }


  if(!description&&!title){
    return { status: 400, message: `Both description and title fields are empty` };

  }
    if(!description){
    description = result.description;
  }
  else if(!title){
    title = result.title;
  }
  

  const updatedBlog = blogRepository.updateBlogById(
    title,
    description,
    blogId
  );
  if (updatedBlog) {
    return { status: 200, message: `Blog body is updated successfully` };
  }
  
    return { status: 500, message: "Failed to update blog" };

};


const deleteBlogById = async (blogId) => {
  
  const result = await blogRepository.getBlogById(blogId);

  if (!result) {
    return {
      status: 404,
      message: `No blog found with this id`,
    };
  }

  const isUserDeleted = blogRepository.deleteBlogById(blogId);
  if (!isUserDeleted) {
  return { status: 404, message: `Failed to Delete ${blogId}` };
  } 
  return { status: 200, message: `'${result.title}' is successfully deleted` };

  
};


module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,

};
