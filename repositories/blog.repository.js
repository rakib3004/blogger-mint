const Blog = require("../models/blog.model");

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.findAll();
    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBlog = async (id, username, title, body) => {
  try {
    const blog = await Blog.create({
      id: id,
      username: username,
      title: title,
      body: body,
    });
    return blog;
  } catch (error) {
    throw error;
  }
};

const getBlogByBlogId = async (blogId) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: blogId,
      },
    });

    if (blog) {
      return blog;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const updateBlogByBlogId = async (blogBody, blogId) => {
  try {
    const blog = await Blog.update(
      { body: blogBody },
      { where: { id: blogId } }
    );
    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const deleteBlogByBlogId = async (blogId) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: blogId,
      },
    });
    if (blog) {
      await blog.destroy();
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};




module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlogByBlogId,
  deleteBlogByBlogId,
};
