const blogService = require('../services/blog.service');
const sendResponseInContentNegotiation = require('../utils/content-negotiation.util');

const getAllBlogs = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page, 10);
        let pageSize = parseInt(req.query.size, 10);

        if (!req.query.page || pageNumber < 0) {
            pageNumber = 1;
        }

        if (!req.query.size || pageSize < 0) {
            pageSize = 3;
        }

        const getAllBlogsResponse = await blogService.getAllBlogs(pageNumber, pageSize);
        const responseStatus = 200;
        const responseData = getAllBlogsResponse;
        return sendResponseInContentNegotiation(req, res, responseStatus, responseData);
    } catch (err) {
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const createBlog = async (req, res) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            return res.send({ status: 400, message: 'Request body is empty' });
        }
        req.body.username = req.username;
        const createBlogResponse = await blogService.createBlog(req.body);
        const responseStatus = 201;
        const responseData = createBlogResponse;
        return sendResponseInContentNegotiation(req, res, responseStatus, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const getBlogByBlogId = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }
        const getBlogByBlogIdResponse = await blogService.getBlogByBlogId(req.params.id);

        const responseStatus = getBlogByBlogIdResponse.status;
        const responseData = getBlogByBlogIdResponse.message;
        return sendResponseInContentNegotiation(req, res, responseStatus, responseData);
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
        const responseStatus = 200;
        const responseData = getBlogByAuthorIdResponse;
        return sendResponseInContentNegotiation(req, res, responseStatus, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const updateBlogByBlogId = async (req, res) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            return res.send({ status: 400, message: 'Request body is empty' });
        }
        if (!req.params.id) {
            res.send({ status: 400, message: 'Request parameter is empty' });
        }
        const updateBlogByBlogIdResponse = await blogService.updateBlogByBlogId(
            req.body,
            // eslint-disable-next-line comma-dangle
            req.params.id
        );
        return res.send({
            status: updateBlogByBlogIdResponse.status,
            message: updateBlogByBlogId.message,
        });
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const deleteBlogByBlogId = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }

        const deleteBlogByBlogIdResponse = await blogService.deleteBlogByBlogId(req.params.id);

        return res.send(deleteBlogByBlogIdResponse);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
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
