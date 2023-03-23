const blogService = require("../services/blog.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");

const getAllBlogs = async (req, res) => {
  try {

    let pageNumber =(!req.query.page||req.query.page)<=0? 1: parseInt(req.query.page);
    let pageSize = (!req.query.limit||req.query.limit)<=0? 3: parseInt(req.query.limit);
     
    const getAllBlogsResponse = await blogService.getAllBlogs(pageNumber,pageSize);
    const responseData = getAllBlogsResponse;
    sendResponseInContentNegotiation(req,res,200,responseData);
  } catch (err) {
    console.error(err)
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const createBlog = async (req, res) => {
  try {
    if (JSON.stringify(req.body)==="{}") {
      return res.send({ status: 400, message: "Request body is empty" });
    }
    req.body.username = req.username;
    const createBlogResponse = await blogService.createBlog(req.body);
    const responseData = createBlogResponse;
    sendResponseInContentNegotiation(req,res,201,responseData);

  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogByBlogId = async (req, res) => {
  try {
    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }
    const getBlogByBlogIdResponse = await blogService.getBlogByBlogId(
      req.params.id
    );
   
        const responseStatus = getBlogByBlogIdResponse.status;
        const responseData = getBlogByBlogIdResponse.message;
        sendResponseInContentNegotiation(req,res,responseStatus,responseData);
   
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getBlogByAuthorId = async (req, res) => {
  try {

    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const getBlogByAuthorIdResponse = await blogService.getBlogByAuthorId(
      req.params.id
    );
    const responseData = getBlogByAuthorIdResponse;
    sendResponseInContentNegotiation(req,res,200,responseData);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const updateBlogByBlogId = async (req, res) => {
  try {

    
    if (JSON.stringify(req.body)==="{}") {
      return res.send({ status: 400, message: "Request body is empty" });
    }
    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }
    const updateBlogByBlogIdResponse =
      await blogService.updateBlogByBlogId(req.body, req.params.id);
    res.send({status: updateBlogByBlogIdResponse.status, message:updateBlogByBlogId.message});
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const deleteBlogByBlogId = async (req, res) => {
  try {
    if (!req.params.id) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const deleteBlogByBlogIdResponse = await blogService.deleteBlogByBlogId(
      req.params.id
    );

      res.send(deleteBlogByBlogIdResponse);
    

    
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
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
