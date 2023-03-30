const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const { SequelizeValidationError } = require("../utils/error.handler.util");

const getAllBlogs = async (offset, limit) => {
    const blogs = await Blog.findAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      include: {
        model: User,
        attributes : ['username']
      }
    });
    return blogs;
  
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
    throw new SequelizeValidationError(error, 400);
  }
};

const getBlogById = async (blogId) => {
    const blog = await Blog.findOne({
      where: {
        id: blogId,
      },
    });

    return blog;
 
};

const getBlogByAuthorId = async (authorId) => {
    const blog = await Blog.findAll({
      where: {
        authorId: authorId,
      },
    });

    return blog;
  
};

const updateBlogById = async (title, description, blogId) => {
    const blog = await Blog.update(
      { title: title, description: description },
      { where: { id: blogId } }
    );

    return blog;
 
};

const deleteBlogById = async (blogId) => {
    const result = await Blog.destroy({
      where: {
        id: blogId,
      },
    });

    return result;
 
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
};
