const blogRepository = require("../../repositories/blog.repository");
const {
  fullBlogList,
  authorFullBlogList,
  singleBlog,
} = require("../databases/blog.database");
const userService = require("../../services/user.service");
const blogService = require("../../services/blog.service");
const { AppError } = require("../../utils/error.handler.util");
const commonUtil = require("../../utils/common.util");

describe("Testing Blog Service", () => {
  describe("Testing getAllBlogs Function: ", () => {
    it("getAllBlogs: Return all blogs in Response", async () => {
      const query = {
        page: 1,
        limit: 5,
      };
      const page = query.page;
      const limit = query.limit;
      const offset = (page - 1) * limit;

      const expectedResponse = fullBlogList;
      jest
        .spyOn(blogRepository, "getAllBlogs")

        .mockResolvedValueOnce(expectedResponse);

      const response = await blogService.getAllBlogs(query);
      expect(blogRepository.getAllBlogs).toHaveBeenCalledWith(offset, limit);

      expect(blogRepository.getAllBlogs).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("getAllBlogs: Throw an error if the blogRepository call fails", async () => {
      const query = {
        page: 1,
        limit: 5,
      };

      const expectedError = new Error("Internal Server Error");
      jest
        .spyOn(blogRepository, "getAllBlogs")
        .mockRejectedValueOnce(expectedError);

      await expect(blogService.getAllBlogs(query)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing createBlog Function: ", () => {
    it("createBlog: create an blog and return a blog response: ", async () => {
      const title = "test";
      const description = "test@cefalo.com";
     

      const body = {
        title: title,
        description: description,
      };
      const expectedResponse = {
        id: "476901fd-4bef-4f15-a65f-c04d601627fe",
        title: "Testing title",
        description: "Testing description",
        authorId: "5ca32cb8-5c35-4f77-96c3-517007593328",
        createdAt: "2023-04-03T09:05:43.000Z",
        updatedAt: "2023-04-03T09:05:43.009Z",
      };
      const userResponse = {
        user: {
          id: "5ca32cb8-5c35-4f77-96c3-517007593328",
          username: "testuser",
          email: "inan@cefalo.com",
          createdAt: "2023-04-03T09:03:43.000Z",
          updatedAt: "2023-04-03T09:03:43.280Z",
        },
      };

     
      const username = userResponse.user.username;
      body.username = username;
      jest
        .spyOn(userService, "getUserByUsername")
        .mockResolvedValueOnce(userResponse);

      jest
        .spyOn(blogRepository, "createBlog")
        .mockResolvedValueOnce(expectedResponse);

      const response = await blogService.createBlog(body);

      expect(blogRepository.createBlog).toHaveBeenCalledTimes(1);
      
      expect(userService.getUserByUsername).toHaveBeenCalledWith(username);

      expect(userService.getUserByUsername).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it("createBlog: Throw an error if the blogRepository call fails", async () => {
      const title = "test";
      const description = "test@cefalo.com";

      const body = {
        title: title,
        description: description,
      };

      const expectedError = new AppError("User not found", 404);
      jest
        .spyOn(blogRepository, "createBlog")
        .mockRejectedValueOnce(expectedError);

      await expect(blogService.createBlog(body)).rejects.toThrow(expectedError);
    });
  });

  describe("Testing getBlogById Function: ", () => {
    it("getBlogById: Return a blog by id: ", async () => {
      const id = "2565056511561";
      const expectedResponse = singleBlog;
      jest
        .spyOn(blogRepository, "getBlogById")
        .mockResolvedValueOnce(expectedResponse);
      const response = await blogService.getBlogById(id);

      expect(blogRepository.getBlogById).toHaveBeenCalledWith(id);
      expect(blogRepository.getBlogById).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("getBlogById: Throw an error blog not found if blog id does not exits", async () => {
      const id = "16514651474";
      const expectedError = new AppError("No blog found with this Id", 404);
      jest
        .spyOn(blogRepository, "getBlogById")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.getBlogById(id)).rejects.toThrow(expectedError);
    });

    it("getBlogById: Throw an error if the blogRepository call fails", async () => {
      const id = "16514651474";
      const expectedError = new Error("Internal Server Error");
      jest
        .spyOn(blogRepository, "getBlogById")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.getBlogById(id)).rejects.toThrow(expectedError);
    });
  });

  describe("Testing getBlogByAuthorId Function: ", () => {
    it("getBlogByAuthorId: Return an array of blogs of a given authorId: ", async () => {
      const authorId = "16514651474";
      const expectedResponse = authorFullBlogList;
      jest
        .spyOn(blogRepository, "getBlogByAuthorId")
        .mockResolvedValueOnce(expectedResponse);
      const response = await blogService.getBlogByAuthorId(authorId);

      expect(blogRepository.getBlogByAuthorId).toHaveBeenCalledTimes(1);
      expect(blogRepository.getBlogByAuthorId).toHaveBeenCalledWith(authorId);
      expect(response).toBe(expectedResponse);
    });
    it("getBlogByAuthorId: Throw an error blog not found if author id does not exits", async () => {
      const authorId = "16514651474";
      const expectedError = new AppError("No blog found with this Id", 404);
      jest
        .spyOn(blogRepository, "getBlogByAuthorId")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.getBlogByAuthorId(authorId)).rejects.toThrow(
        expectedError
      );
    });
    it("getBlogByAuthorId: Throw an error if the blogRepository call fails", async () => {
      const authorId = "16514651474";
      const expectedError = new Error("Internal Server Error");
      jest
        .spyOn(blogRepository, "getBlogByAuthorId")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.getBlogByAuthorId(authorId)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing updateBlogById Function: ", () => {
    it("updateBlogById: update a blog by id and return a blog response ", async () => {
      const id = "16514651474";
      const title = "test title";
      const description = "test description";
      const updatedAt = commonUtil.formatUnixTimestamp(Date.now());

      const body = {
        title: title,
        description: description,
      };

      const expectedResponse = [1];
      jest
        .spyOn(blogRepository, "updateBlogById")
        .mockResolvedValueOnce(expectedResponse);
      const response = await blogService.updateBlogById(body, id);

      expect(blogRepository.updateBlogById).toHaveBeenCalledWith(
        title,
        description,
        updatedAt,
        id
      );
      expect(blogRepository.updateBlogById).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });
    

    it("updateBlogById: Throw an error if the blogRepository call fails", async () => {
      const id = "16514651474";
      const title = "test title";
      const description = "test description";

      const body = {
        title: title,
        description: description,
      };

      const expectedError = new Error("Internal Server Error");
      jest
        .spyOn(blogRepository, "updateBlogById")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.updateBlogById(body, id)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing deleteBlogById Function: ", () => {
    it("deleteBlogById: delete a blog by id: ", async () => {
      const id = "2565056511561";
      const expectedResponse = 1;
      jest
        .spyOn(blogRepository, "deleteBlogById")
        .mockResolvedValueOnce(expectedResponse);
      const response = await blogService.deleteBlogById(id);

      expect(blogRepository.deleteBlogById).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("deleteBlogById: Throw an error if the blogRepository call fails", async () => {
      const id = "16514651474";
      const expectedError = new Error("Internal Server Error");
      jest
        .spyOn(blogRepository, "deleteBlogById")
        .mockRejectedValueOnce(expectedError);
      await expect(blogService.deleteBlogById(id)).rejects.toThrow(
        expectedError
      );
    });
  });
});
