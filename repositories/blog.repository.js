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

const createBlog = async (
  id,
  title,
  description,
  authorId,
  createdAt,
  updatedAt
) => {
  try {
    const blog = await Blog.create({
      id: id,
      title: title,
      description: description,
      authorId: authorId,
      createdAt: createdAt,
      updatedAt: updatedAt,
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
      
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const getBlogByAuthorId = async (authorId) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        authorId: authorId,
      },
    });

    if (blogs) {
      return blogs;
    } 
      return null;

  } catch (error) {
    throw error;
  }
};

const updateBlogByBlogId = async (title, description, blogId) => {
  try {
    const blog = await Blog.update(
      { title: title, description: description },
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
    } 
      return null;
  
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  getBlogByAuthorId,
  updateBlogByBlogId,
  deleteBlogByBlogId,
};
