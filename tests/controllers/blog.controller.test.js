const blogController = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");
const {
  fullBlogList,
  authorFullBlogList,
  singleBlog,
} = require("../databases/blog.database");
const { AppError } = require("../../utils/error.handler.util");
const contentNegotiation = require("../../utils/content-negotiation.util");

describe("Testing Blog Controller", () => {
  describe("Testing getAllBlogs Function: ", () => {
    it("getAllBlogs: Return all blogs in response", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = fullBlogList;

      jest
        .spyOn(blogService, "getAllBlogs")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);
      const query = req.query;

      const response = await blogController.getAllBlogs(req, res, next);

      expect(blogService.getAllBlogs).toHaveBeenCalledWith(query);

      expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("getAllBlogs: Throw an error if the blogService call fails", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "getAllBlogs")
        .mockRejectedValueOnce(expectedError);

      await blogController.getAllBlogs(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Testing getBlogById Function: ", () => {
    it("getBlogById: Return a blog response by id", async () => {
      const id = "2afcb6d5-32e5-4b33-becb-83dee222b3c2";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedResponse = singleBlog;

      jest
        .spyOn(blogService, "getBlogById")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.getBlogById(req, res, next);

      expect(blogService.getBlogById).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("getBlogById: Throw a 404 error if blog id does not exits", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("No blog found with this id", 404);

      jest
        .spyOn(blogService, "getBlogById")
        .mockRejectedValueOnce(expectedError);

      await blogController.getBlogById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("getBlogById: Throw an error if the blogService call fails", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "getBlogById")
        .mockRejectedValueOnce(expectedError);

      await blogController.getBlogById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Testing getBlogByAuthorId Function: ", () => {
    it("getBlogByAuthorId: Return an array of blogs of a given authorId: ", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = authorFullBlogList;

      jest
        .spyOn(blogService, "getBlogByAuthorId")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.getBlogByAuthorId(req, res, next);

      expect(blogService.getBlogByAuthorId).toHaveBeenCalledWith(id);
      expect(blogService.getBlogByAuthorId).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);

      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });
    it("getBlogByAuthorId: Throw an 404 error if author id does not exits", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("No blog found with this id", 404);

      jest
        .spyOn(blogService, "getBlogByAuthorId")
        .mockRejectedValueOnce(expectedError);

      await blogController.getBlogByAuthorId(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("getBlogByAuthorId: Throw an error if the blogService call fails", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "getBlogByAuthorId")
        .mockRejectedValueOnce(expectedError);

      await blogController.getBlogByAuthorId(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Testing createBlog Function: ", () => {
    it("createBlog: create an blog and return a blog response: ", async () => {
      const title = "Testing Title";
      const description = "Testing description";

      const req = {
        body: {
          title: title,
          description: description,
        },
      };
      const res = {};
      const next = jest.fn();
      const body = req.body;

      const expectedResponse = {
        data: singleBlog,
        message: "Blog is successfully created",
      };

      jest.spyOn(blogService, "createBlog").mockResolvedValue(expectedResponse);
      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.createBlog(req, res, next);

      expect(blogService.createBlog).toHaveBeenCalledWith(body);
      expect(blogService.createBlog).toHaveBeenCalledTimes(1);

      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("createBlog: throw an error if the blogService call fails", async () => {
      const title = "Testing Title";
      const description = "Testing description";

      const req = {
        body: {
          title: title,
          description: description,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "createBlog")
        .mockRejectedValueOnce(expectedError);

      await blogController.createBlog(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  it("createBlog: throw an error if the Request body is empty", async () => {
    const req = {
      body: {},
    };
    const res = {};
    const next = jest.fn();

    const expectedError = new AppError("Request body is empty",400);

    jest.spyOn(blogService, "createBlog").mockRejectedValueOnce(expectedError);
    await blogController.createBlog(req, res, next);
    expect(next).toHaveBeenCalledWith(expectedError);
  });

  it("createBlog: throw an error if the title is empty", async () => {
    const description = "Testing description";

    const req = {
      body: {
        description: description,
      },
    };
    const res = {};
    const next = jest.fn();

    const expectedError = new AppError("Title field is empty",400);

    jest.spyOn(blogService, "createBlog").mockRejectedValueOnce(expectedError);
    await blogController.createBlog(req, res, next);
    expect(next).toHaveBeenCalledWith(expectedError);
  });

  it("createBlog: throw an error if the description is empty", async () => {
    const title = "Testing Title";

      const req = {
        body: {
          title: title,
        },
      };
    const res = {};
    const next = jest.fn();

    const expectedError = new AppError("Description field is empty",400);

    jest.spyOn(blogService, "createBlog").mockRejectedValueOnce(expectedError);
    await blogController.createBlog(req, res, next);
    expect(next).toHaveBeenCalledWith(expectedError);
  });

  describe("Testing updateBlogById Function: ", () => {
    it("updateBlogById: update a blog by id and return updated blog response", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const title = "Testing Title";
      const description = "Testing description";

      const req = {
        params: {
          id: id,
        },
        body: {
          title: title,
          description: description,
        },
      };
      const res = {};
      const next = jest.fn();
      const body = req.body;
      const blogId = req.params.id;

      const expectedResponse = {
        message: "Blog  is successfully updated",
      };

      jest
        .spyOn(blogService, "updateBlogById")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.updateBlogById(req, res, next);

      expect(blogService.updateBlogById).toHaveBeenCalledWith(body,blogId);

      expect(blogService.updateBlogById).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("updateBlogById: throw an error if the blogService call fails", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const title = "Testing Title";
      const description = "Testing description";

      const req = {
        params: {
          id: id,
        },
        body: {
          title: title,
          description: description,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "updateBlogById")
        .mockRejectedValueOnce(expectedError);

      await blogController.updateBlogById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it("updateBlogById: throw an error if Request body is empty", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";

      const req = {
        params: {
          id: id,
        },
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new AppError("Request body is empty", 400);

      jest
        .spyOn(blogService, "updateBlogById")
        .mockRejectedValueOnce(expectedError);
      await blogController.updateBlogById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Testing deleteBlogById Function: ", () => {
    it("deleteBlogById: delete a blog by id: ", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        message: "Blog  is successfully deleted",
      };

      jest
        .spyOn(blogService, "deleteBlogById")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.deleteBlogById(req, res, next);

      expect(blogService.deleteBlogById).toHaveBeenCalledWith(id);
      expect(blogService.deleteBlogById).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("deleteBlogById: throw an error if the blogService call fails", async () => {
      const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(blogService, "deleteBlogById")
        .mockRejectedValueOnce(expectedError);

      await blogController.deleteBlogById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
