const blogService = require('../services/blog.service');
const sendResponseInContentNegotiation = require('../utils/content-negotiation.util');

const getAllBlogs = async (req, res) => {
    try {
        const radixValue = 10;
        const defaultPageNumber = 1;
        const defaultPageSize = 3;
        const pageNumber =
            !req.query.page || req.query.page <= 0 ? defaultPageNumber : parseInt(req.query.page, radixValue);
        const pageSize =
            !req.query.limit || req.query.limit <= 0 ? defaultPageSize : parseInt(req.query.limit, radixValue);

        const getAllBlogsResponse = await blogService.getAllBlogs(pageNumber, pageSize);
        const responseData = getAllBlogsResponse;
        sendResponseInContentNegotiation(req, res, 200, responseData);
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const createBlog = async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.send({ status: 400, message: 'Request body is empty' });
    }

    try {
        req.body.username = req.username;
        const createBlogResponse = await blogService.createBlog(req.body);
        const responseData = createBlogResponse;
        return sendResponseInContentNegotiation(req, res, 201, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const getBlogById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.send({ status: 400, message: 'Request parameter is empty' });
        }
        const getBlogByBlogIdResponse = await blogService.getBlogByBlogId(req.params.id);

        const responseData = getBlogByBlogIdResponse.message;
        return sendResponseInContentNegotiation(req, res, 200, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const getBlogByAuthorId = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }

        const getBlogByAuthorIdResponse = await blogService.getBlogByAuthorId(req.params.id);
        const responseData = getBlogByAuthorIdResponse;
        return sendResponseInContentNegotiation(req, res, 200, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const updateBlogById = async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.send({ status: 400, message: 'Request body is empty' });
    }
    try {
        if (!req.params.id) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }
        const updateBlogByIdResponse = await blogService.updateBlogById(req.body, req.params.id);
        return res.send({ status: updateBlogByIdResponse.status, message: updateBlogById.message });
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }

        const deleteBlogByIdResponse = await blogService.deleteBlogById(req.params.id);
        return res.status(200).json(deleteBlogByIdResponse);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
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
