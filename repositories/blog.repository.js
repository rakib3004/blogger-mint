const Blog = require("../models/blog.model");

const getAllBlogs = async (offset, limit) => {
  try {
    const blogs = await Blog.findAll({
      offset: offset,
      limit: limit,
    });
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

const getBlogById = async (blogId) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: blogId,
      },
    });

    return blog;
  } catch (error) {
    throw error;
  }
};

const getBlogByAuthorId = async (authorId) => {
  try {
    const blog = await Blog.findAll({
      where: {
        authorId: authorId,
      },
    });

    return blog;
  } catch (error) {
    throw error;
  }
};

const updateBlogById = async (title, description, blogId) => {
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

const deleteBlogById = async (blogId) => {
  try {
    const result = await Blog.destroy({
      where: {
        id: blogId,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
};
