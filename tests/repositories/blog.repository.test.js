const blogRepository = require("../../repositories/blog.repository");
const blogDatabase = require("../databases/blog.database");
const { AppError } = require("../../utils/error.handler.util");
const {Blog} = require("../../models");

describe('Testing Blog Repository: ', () => {
    describe('Testing getAllBlogs Function: ', () => {
        it('getAllBlogs: Return an array of blogs: ', async () => {

            const query = {
                page: 1,
                limit: 5,
              };
        
              const expectedResponse = {};
              jest
                .spyOn(Blog, 'findAll')
                .mockResolvedValue(expectedResponse);
        
              const response = await blogRepository.getAllBlogs(query);
              expect(Blog.findAll).toHaveBeenCalledTimes(1);
              Blog.findAll.mockClear();
              expect(response).toBe(expectedResponse);
        });

      /*  it('getAllBlogs: Throw an error for database query error', async () => {


            const query = {
                page: 1,
                limit: 5,
              };
        
              const expectedError = new Error("Internal Server Error");
              jest
                .spyOn(Blog, 'findAll')
                .mockRejectedValueOnce(expectedError);
        
              await expect(blogRepository.getAllBlogs(query)).rejects.toThrow(
                expectedError
              );
        });*/


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
              .spyOn(Blog, 'create')
              .mockResolvedValue(expectedResponse);
            const response = await blogRepository.createBlog(body);
      
            expect(Blog.create).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

    /*    it('createBlog: Throw an error for database query error', async () => {
            const title = "test";
            const description = "test@cefalo.com";
      
            const body = {
              title: title,
              description: description,
            };
      
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(Blog, 'create')
              .mockRejectedValueOnce(expectedError);
      
            await expect(blogRepository.createBlog(body)).rejects.toThrow(expectedError);
        });*/
    });

    describe('Testing getBlogById Function: ', () => {
        it('getBlogById: Return a blog by id: ', async () => {
            const id = "2565056511561";
            const expectedResponse = {};
            jest
              .spyOn(Blog, 'findOne')
              .mockResolvedValue(expectedResponse);
            const response = await blogRepository.getBlogById(id);
      
            expect(Blog.findOne).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('getBlogById: Return 0 if the blog does not exist', async () => {

            const id = "16514651474";
            const expectedError = new AppError("No blog found with this Id", 404);
            jest
              .spyOn(Blog, 'findOne')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.getBlogById(id)).rejects.toThrow(expectedError);

        });

      /*  it('getBlogById: Throw an error for database query error', async () => {


            const id = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(Blog, 'findOne')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.getBlogById(id)).rejects.toThrow(expectedError);


        });*/
    });

    describe('Testing getBlogByAuthorId Function: ', () => {
        it('getBlogByAuthorId: Return an array of blogs of a given authorId: ', async () => {

            const authorId = "16514651474";
            const expectedResponse = {};
            jest
              .spyOn(Blog, 'findAll')
              .mockResolvedValue(expectedResponse);
            const response = await blogRepository.getBlogByAuthorId(authorId);
      
            expect(Blog.findAll).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('getBlogByAuthorId: Return 0 if the author does not exist', async () => {

            const authorId = "16514651474";
            const expectedError = new AppError("No blog found with this Id", 404);
            jest
              .spyOn(Blog, 'findAll')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.getBlogByAuthorId(authorId)).rejects.toThrow(
              expectedError
            );

        });

       /* it('getBlogByAuthorId: Throw an error for database query error', async () => {

            const authorId = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(Blog, 'findAll')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.getBlogByAuthorId(authorId)).rejects.toThrow(
              expectedError
            );


        });*/
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
              .spyOn(Blog, 'update')
              .mockResolvedValue(expectedResponse);
            const response = await blogRepository.updateBlogById(body, id);
      
            expect(Blog.update).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

       
      /*  it('updateBlogById: Throw an error for database query error', async () => {

            const id = "16514651474";
            const title = "test title";
            const description = "test description";
      
            const body = {
              title: title,
              description: description,
            };
      
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(Blog, 'update')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.updateBlogById(body, id)).rejects.toThrow(
              expectedError
            );
    
        });*/
    });

    describe('Testing deleteBlogById Function: ', () => {
        it('deleteBlogById: delete a blog by id: ', async () => {
            const id = "2565056511561";
            const expectedResponse = {};
            jest
              .spyOn(Blog, 'destroy')
              .mockResolvedValue(expectedResponse);
            const response = await blogRepository.deleteBlogById(id);
      
            expect(Blog.destroy).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });


       /* it('deleteBlogById: Throw an error for database query error', async () => {
            const id = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(Blog, 'destroy')
              .mockRejectedValueOnce(expectedError);
            await expect(blogRepository.deleteBlogById(id)).rejects.toThrow(expectedError);
        });*/
    });
});
