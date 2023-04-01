const blogController = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");
const blogDatabase = require("../databases/blog.database");
const { AppError } = require("../../utils/error.handler.util");
const sendResponseInContentNegotiation = require("../../utils/content-negotiation.util");


describe('Testing Blog Controller', () => {
    describe('Testing getAllBlogs Function: ', () => {
        it('Return all blogs in response', async () => {

            const req = {
                query: {
                  page: 1,
                  limit: 5,
                },
              };
              const res = {};
              const next = jest.fn();
              const expectedResponse = {};
        
              jest
                .spyOn(blogService, 'getAllBlogs')
                .mockResolvedValue(expectedResponse);
              jest
                .spyOn(
                  sendResponseInContentNegotiation,
                  'sendResponseInContentNegotiation'
                )
                .mockResolvedValue(expectedResponse);
        
              const response = await blogController.getAllBlogs(req, res, next);
        
              expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1);
              expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
              expect(response).toBe(expectedResponse);
           

        });

        it('Throw an error if the blogService call fails', async () => {

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
                .spyOn(blogService, 'getAllBlogs')
                .mockRejectedValueOnce(expectedError);
        
              await blogController.getAllBlogs(req, res, next);
        
              expect(next).toHaveBeenCalledWith(expectedError);

        });
    });

    describe('Testing getBlogById Function: ', () => {
        it('Return a blog response by id', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
              params: {
                id: id,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(blogService, 'getBlogById')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await blogController.getBlogById(req, res, next);
      
            expect(blogService.getBlogById).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('Throw a 404 error if blog id does not exits', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
              params: {
                id: id,
              },
            };
            const res = {};
            const next = jest.fn();

            const expectedError = new AppError('No blog found with this id',404);
      
            jest.spyOn(blogService, 'getBlogById').mockRejectedValueOnce(expectedError);
      
            await blogController.getBlogById(req,res,next);
      
            expect(next).toHaveBeenCalledWith(expectedError);

        });

        it('Throw an error if the blogService call fails', async () => {

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
              .spyOn(blogService, 'getBlogById')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.getBlogById(req, res, next);
      
            expect(next).toHaveBeenCalledWith(expectedError);


        });
    });

    describe('Testing getBlogByAuthorId Function: ', () => {
        it('Return an array of blogs of a given authorId: ', async () => {

            const authorId = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
              params: {
                authorId: authorId,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(blogService, 'getBlogByAuthorId')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await blogController.getBlogByAuthorId(req, res, next);
      
            expect(blogService.getBlogByAuthorId).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });
        it('Throw an 404 error if author id does not exits', async () => {


            const authorId = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
              params: {
                authorId: authorId,
              },
            };
            const res = {};
            const next = jest.fn();
      
    
            const expectedError = new AppError('No blog found with this id',404);
      
            jest.spyOn(blogService, 'getBlogByAuthorId').mockRejectedValueOnce(expectedError);
      
            await blogController.getBlogByAuthorId(req,res,next);
      
            expect(next).toHaveBeenCalledWith(expectedError);


        });

        it(' Throw an error if the blogService call fails', async () => {

            const authorId = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
              params: {
                authorId: authorId,
              },
            };
            const res = {};
            const next = jest.fn();
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(blogService, 'getBlogByAuthorId')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.getBlogByAuthorId(req, res, next);
      
            expect(next).toHaveBeenCalledWith(expectedError);

        });
    });

    describe('Testing createBlog Function: ', () => {
        it(' create an blog and return a blog response: ', async () => {

            const title = 'Testing Title';
            const description = 'Testing description';

            const req = {
              body: {
                title: title,
                description: description,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(blogService, 'createBlog')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await blogController.createBlog(req, res, next);
      
            expect(blogService.createBlog).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);


        });

        it(' throw an error if the title and description are empty', async () => {

            const req = {
                body: {
              
                },
              };
              const res = {};
              const next = jest.fn();
        
              const expectedError = new AppError('Request body is empty',400);
      
              jest.spyOn(blogService, 'createBlog')
                .mockRejectedValueOnce(expectedError);
              await blogController.createBlog(req, res, next);
              expect(next).toHaveBeenCalledWith(expectedError);


        });


        it(' throw an error if the blogService call fails', async () => {

            const title = 'Testing Title';
            const description = 'Testing description';

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
              .spyOn(blogService, 'createBlog')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.createBlog(req, res, next);
      
            expect(next).toHaveBeenCalledWith(expectedError);



        });
    });

    describe('Testing updateBlogById Function: ', () => {
        it(' update a blog by id and return updated blog response', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const title = 'Testing Title';
            const description = 'Testing description';

            const req = {
                params:{
                id:id,
                },
              body: {
                title: title,
                description: description,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(blogService, 'updateBlogById')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await blogController.updateBlogById(req, res, next);
      
            expect(blogService.updateBlogById).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it(' throw an error if the both title and description are empty', async () => {


            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";

            const req = {
                params:{
                id:id,
                },
              body: {
           
              },
            };
              const res = {};
              const next = jest.fn();
              const expectedError = new AppError('Request body is empty',400);
      
              jest.spyOn(blogService, 'updateBlogById')
                .mockRejectedValueOnce(expectedError);
              await blogController.updateBlogById(req, res, next);
              expect(next).toHaveBeenCalledWith(expectedError);

        });

        it(' throw an error if the blogService call fails', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const title = 'Testing Title';
            const description = 'Testing description';

            const req = {
                params:{
                id:id,
                },
              body: {
                title: title,
                description: description,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedError = new Error("Internal Server Error");
      
            jest.spyOn(blogService, 'updateBlogById')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.updateBlogById(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);

        });
    });

    describe('Testing deleteBlogById Function: ', () => {
        it(' delete a blog by id: ', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
                params:{
                id:id,
                },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(blogService, 'deleteBlogById')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await blogController.deleteBlogById(req, res, next);
      
            expect(blogService.deleteBlogById).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);


        });

        it(' throw an error if the blogService call fails', async () => {

            const id = "e8d6ccab-2fd3-43f2-bfea-166f24e2a44a";
            const req = {
                params:{
                id:id,
                },
            };
            const res = {};
            const next = jest.fn();
            const expectedError = new Error("Internal Server Error");
      
            jest.spyOn(blogService, 'deleteBlogById')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.deleteBlogById(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);

        });
    });

});