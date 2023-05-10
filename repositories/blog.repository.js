const { User, Blog } = require("../models");

const { SequelizeValidationError } = require("../utils/error.handler.util");

exports.createBlog = async (
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

exports.getAllBlogs = async (offset, limit) => {
  const { count, rows } = await Blog.findAndCountAll({
    offset,
    limit,
    order: [['updatedAt', 'DESC']],
    include: {
      model: User,
      attributes: ['username']
    }
  });
  const result = { blogs: rows, count: count }
  return result;
};

exports.getBlogsByAuthorId = async (offset, limit, authorId) => {
  const { count, rows } = await Blog.findAndCountAll({
    offset,
    limit,
    where: {
      authorId: authorId,
    },
    order: [['updatedAt', 'DESC']],
    include: {
      model: User,
      attributes: ['username']
    }
  });

  const result = { blogs: rows, count: count }
  return result;

};

exports.getBlogById = async (blogId) => {
  const blog = await Blog.findOne({
    where: {
      id: blogId,
    },
  });

  return blog;

};


exports.updateBlogById = async (title, description, updatedAt, blogId) => {
  const blog = await Blog.update(
    { title: title, description: description, updatedAt: updatedAt },
    {
      where: {
        id: blogId,
      }
    }
  );

  return blog;

};

exports.deleteBlogById = async (blogId) => {
  const result = await Blog.destroy({
    where: {
      id: blogId,
    },
  });

  return result;

};


