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
  const userName = String(body.username);
  const authorResponse = await userService.getUserByUsername(userName);

  const authorId = authorResponse.user.id;


  if (!title) {
    return { status: 400, message: "title Field is Empty" };
  }

  if (!description) {
    return { status: 400, message: "description Field is Empty" };
  }
// validation: title must be more than 5 word, description must be 10 word

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

const getBlogByBlogId = async (blogIdParam) => {
  const result = await blogRepository.getBlogByBlogId(blogIdParam);

  const errorMessage = {"message":"This blog is not found in database"};

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
      message: `This blog is not found in database`,
    };
  }
    return result;

};

const updateBlogByBlogId = async (body, blogIdParam) => {
  const title = body.title;
  const description = body.description;


  const result = await blogRepository.getBlogByBlogId(blogIdParam);
  if (!result) {
    return {
      status: 404,
      message: `This blog is not found in database`,
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
  

  const isBlogBodyUpdated = blogRepository.updateBlogByBlogId(
    title,
    description,
    blogIdParam
  );
  if (isBlogBodyUpdated) {
    return { status: 200, message: `Blog body is updated successfully` };
  }
  
    return { status: 500, message: "Failed to update blog" };

};


const deleteBlogByBlogId = async (usernameParamData) => {
  const blogIdParam = usernameParamData;
  
  const result = await blogRepository.getBlogByBlogId(blogIdParam);

  if (!result) {
    return {
      status: 404,
      message: `${blogIdParam} is not found in database`,
    };
  }
  const isUserDeleted = blogRepository.deleteBlogByBlogId(blogIdParam);
  if (!isUserDeleted) {
  return { status: 404, message: `Failed to Delete ${blogIdParam}` };
  } 
  return { status: 200, message: `'${result.title}' is successfully deleted` };
  
};


module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  getBlogByAuthorId,
  updateBlogByBlogId,
  deleteBlogByBlogId,

};
