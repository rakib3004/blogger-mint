const blogRepository = require("../../repositories/blog.repository");
const blogDatabase = require("../databases/blog.database");
const {Blog} = require("../models");

describe('Testing Blog Repository: ', () => {
    describe('Testing getAllBlogs Function: ', () => {
        it('getAllBlogs: Return an array of blogs: ', async () => {

            const query = {
                page: 1,
                limit: 5,
              };
        
              const expectedResponse = {};
              jest
                .spyOn(blogRepository, 'getAllBlogs')
                .mockResolvedValue(expectedResponse);
        
              const response = await blogService.getAllUsers(query);
              expect(blogRepository.getAllBlogs).toHaveBeenCalledTimes(1);
              expect(response).toBe(expectedResponse);
        });

        it('getAllBlogs: Throw an error for database query error', async () => {


            const query = {
                page: 1,
                limit: 5,
              };
        
              const expectedError = new Error("Internal Server Error");
              jest
                .spyOn(blogRepository, 'getAllBlogs')
                .mockRejectedValueOnce(expectedError);
        
              await expect(blogService.getAllUsers(query)).rejects.toThrow(
                expectedError
              );


        });
    });

    describe('Testing createBlog Function: ', () => {
        it('createBlog: create an blog and return a blog response: ', async () => {
            const title = "test";
            const description = "test@cefalo.com";
            const body = {
              title: title,
              description: description,
            };
            const expectedResponse = {
      
            };
      
            jest
              .spyOn(blogRepository, 'createBlog')
              .mockResolvedValue(expectedResponse);
            const response = await blogService.createBlog(body);
      
            expect(blogRepository.createBlog).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('createBlog: Throw an error for database query error', async () => {
            const title = "test";
            const description = "test@cefalo.com";
      
            const body = {
              title: title,
              description: description,
            };
      
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'createBlog')
              .mockRejectedValueOnce(expectedError);
      
            await expect(blogService.createBlog(body)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing getBlogById Function: ', () => {
        it('getBlogById: Return a blog by id: ', async () => {
            const id = "2565056511561";
            const expectedResponse = {};
            jest
              .spyOn(blogRepository, 'getBlogById')
              .mockResolvedValue(expectedResponse);
            const response = await blogService.getBlogById(id);
      
            expect(blogRepository.getBlogById).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('getBlogById: Return 0 if the blog does not exist', async () => {

            const id = "16514651474";
            const expectedError = new AppError("No blog found with this Id", 404);
            jest
              .spyOn(blogRepository, 'getBlogById')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.getBlogById(id)).rejects.toThrow(expectedError);

        });

        it('getBlogById: Throw an error for database query error', async () => {


            const id = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'getBlogById')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.getBlogById(id)).rejects.toThrow(expectedError);


        });
    });

    describe('Testing getBlogByAuthorId Function: ', () => {
        it('getBlogByAuthorId: Return an array of blogs of a given authorId: ', async () => {

            const authorId = "16514651474";
            const expectedResponse = {};
            jest
              .spyOn(blogRepository, 'getBlogByAuthorId')
              .mockResolvedValue(expectedResponse);
            const response = await blogService.getBlogByAuthorId(authorId);
      
            expect(blogRepository.getBlogByAuthorId).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('getBlogByAuthorId: Return 0 if the author does not exist', async () => {

            const authorId = "16514651474";
            const expectedError = new AppError("No blog found with this Id", 404);
            jest
              .spyOn(blogRepository, 'getBlogByAuthorId')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.getBlogByAuthorId(authorId)).rejects.toThrow(
              expectedError
            );

        });

        it('getBlogByAuthorId: Throw an error for database query error', async () => {

            const authorId = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'getBlogByAuthorId')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.getBlogByAuthorId(authorId)).rejects.toThrow(
              expectedError
            );


        });
    });

    describe('Testing updateBlogById Function: ', () => {
        it('updateBlogById: update a blog by id', async () => {
            const id = "16514651474";
            const title = "test title";
            const description = "test description";
      
            const body = {
              title: title,
              description: description,
            };
      
            const expectedResponse = {};
            jest
              .spyOn(blogRepository, 'updateBlogById')
              .mockResolvedValue(expectedResponse);
            const response = await blogService.updateBlogById(body, id);
      
            expect(blogRepository.updateBlogById).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

       
        it('updateBlogById: Throw an error for database query error', async () => {

            const id = "16514651474";
            const title = "test title";
            const description = "test description";
      
            const body = {
              title: title,
              description: description,
            };
      
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'updateBlogById')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.updateBlogById(body, id)).rejects.toThrow(
              expectedError
            );
    
        });
    });

    describe('Testing deleteBlogById Function: ', () => {
        it('deleteBlogById: delete a blog by id: ', async () => {
            const id = "2565056511561";
            const expectedResponse = {};
            jest
              .spyOn(blogRepository, 'deleteBlogById')
              .mockResolvedValue(expectedResponse);
            const response = await blogService.deleteBlogById(id);
      
            expect(blogRepository.deleteBlogById).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });


        it('deleteBlogById: Throw an error for database query error', async () => {
            const id = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'deleteBlogById')
              .mockRejectedValueOnce(expectedError);
            await expect(blogService.deleteBlogById(id)).rejects.toThrow(expectedError);
        });
    });
});
