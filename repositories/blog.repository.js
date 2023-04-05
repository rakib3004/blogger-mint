const {User,Blog} = require("../models");

const { SequelizeValidationError } = require("../utils/error.handler.util");

const getAllBlogs = async (offset, limit) => {
  const blogs = await Blog.findAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['username']
    }
  });
  return blogs;

};

const createBlog = async (
  title,
  description,
  authorId,
) => {
  try {
    const blog = await Blog.create({
      title: title,
      description: description,
      authorId: authorId,
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

const updateBlogById = async (title, description, updatedAt, blogId) => {
  const blog = await Blog.update(
    { title: title, description: description, updatedAt:updatedAt },
    {
      where: {
        id: blogId,
      }
    }
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
