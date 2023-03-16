const blogRepository = require("../repositories/blog.repository");
const userUtils = require("../utils/user.utils");

const getAllBlogs = () => {
  return blogRepository.getAllBlogs();
};

const createBlog = async (body) => {
  const id = userUtils.generateUUID();
  const username = body.username; // automatically get from current user
  const title = body.title;
  const blogBody = body.body;

  if (!username) {
    return { status: 400, message: "username Field is Empty" };
  }

  if (!title) {
    return { status: 400, message: "email Field is Empty" };
  }

  if (!blogBody) {
    return { status: 400, message: "password Field is Empty" };
  }

  const newBlog = await blogRepository.createBlog(
    id,
    username,
    title,
    blogBody
  );

  if (newBlog) {
    return newBlog;
  } else {
    return null;
  }
};

const getBlogByBlogId = async (blogIdParam) => {
  if (!blogIdParam) {
    return { status: 400, message: "Invalid blog id in get request" };
  }

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
  const blogBody = body.body;

  if (!blogIdParam) {
    return { status: 400, message: "Invalid blog id in get request" };
  }

  if (!blogBody) {
    return { status: 400, message: "Blog Body Field is Empty" };
  }

  const result = await blogRepository.getBlogByBlogId(blogIdParam);
  if (!result) {
    return {
      status: 404,
      message: `This blog is not found in database`,
    };
  }

  const isBlogBodyUpdated = blogRepository.updateBlogByBlogId(
    blogBody,
    blogIdParam
  );
  if (isBlogBodyUpdated) {
    return { status: 200, message: `Blog body is updated successfully` };
  }
};


const deleteBlogByBlogId = async (usernameParamData) => {
  const blogIdParam = usernameParamData.toLowerCase();
  if (!blogIdParam || !userUtils.isAlphaNumeric(blogIdParam)) {
    return { status: 400, message: "Invalid User in delete request" };
  }

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
