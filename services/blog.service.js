const blogRepository = require("../repositories/blog.repository");
const utility = require("../utils/utility");


const getAllBlogs = () => {
  return blogRepository.getAllBlogs();
};

const createBlog = async (body) => {
  const id = utility.generateUUID();
  const title = body.title;
  const description = body.description;
  const authorId = body.authorId; // automatically get from current user


  if (!title) {
    return { status: 400, message: "title Field is Empty" };
  }

  if (!description) {
    return { status: 400, message: "description Field is Empty" };
  }
// validation: title must be more than 5 word, description must be 10 word

const createdAt = utility.formatUnixTimestamp(Date.now());
const updatedAt = utility.formatUnixTimestamp(Date.now());

  const newBlog = await blogRepository.createBlog(
    id,
    title,
    description,
    authorId,
    createdAt,
    updatedAt
  );

  if (newBlog) {
    return { status: 201, message: newUser };
  } else {
    return { status: 500, message: "Failed to create new blog" };
  }
};

const getBlogByBlogId = async (blogIdParam) => {
  

  const result = await blogRepository.getBlogByBlogId(blogIdParam);

  if (!result) {
    return {
      status: 404,
      message: `This blog is not found in database`,
    };
  } else {
    return result;
  }
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
  else if(!description){
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
  else{
    return { status: 500, message: "Failed to update blog" };

  }
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
  } else {
    return { status: 200, message: `${blogIdParam} is successfully deleted` };
  }
};


module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlogByBlogId,
  deleteBlogByBlogId,

};
