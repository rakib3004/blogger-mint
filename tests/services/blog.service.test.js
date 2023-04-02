const blogRepository = require("../../repositories/blog.repository");
const blogDatabase = require("../databases/blog.database");
const blogService = require("../../services/blog.service");
const { AppError } = require("../../utils/error.handler.util");


describe('Testing Blog Service', () => {
    describe('Testing getAllBlogs Function: ', () => {
        it('getAllBlogs: Return all blogs in Response', async () => {
 
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

        it('getAllBlogs: Throw an error if the blogRepository call fails', async () => {

            const query = {
                page: 1,
                limit: 5,
            };
          
          const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(blogRepository, 'getAllBlogs')
              .mockRejectedValueOnce(expectedError);

              await expect(blogService.getAllUsers(query)).rejects.toThrow(expectedError);


        });
    });

    describe('Testing createBlog Function: ', () => {
        it('createBlog: create an blog and return a blog body: ', async () => {

            
            const id = "16514651474";
            const title = "test";
            const description =  "test@cefalo.com";

            const authorId = "test";
            const createdAt = "2023-04-01 09:59:20";
            const updatedAt = "2023-04-01 09:59:20";
            const body = {
                id: id,
                username: username,
                email :email,
                password :password,
                createdAt :createdAt,
                updatedAt :updatedAt,
            };
                  
            const expectedResponse = {};
      
            jest
              .spyOn(userRepository, 'createUser')
              .mockResolvedValue(expectedResponse);
            const response = await userService.createUser(body);
      
            expect(userRepository.createUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);   
        });

        it('createBlog:Throw an error if the blogRepository call fails', async () => {

        });
    });

    describe('Testing getBlogById Function: ', () => {
        it('getBlogById: Return a blog by id: ', async () => {

        });

        it('getBlogById: Throw an error blog not found if blog id does not exits', async () => {

        });

        it('getBlogById: Throw an error if the blogRepository call fails', async () => {

        });
    });

    describe('Testing getBlogByAuthorId Function: ', () => {
        it('getBlogByAuthorId: Return an array of blogs of a given authorId: ', async () => {

        });
        it('getBlogByAuthorId: Throw an error blog not found if author id does not exits', async () => {

        });
        it('getBlogByAuthorId: Throw an error if the blogRepository call fails', async () => {

        });
    });

    

    describe('Testing updateBlogById Function: ', () => {
        it('updateBlogById: update a blog by id and return a blog response ', async () => {

        });

        it('updateBlogById: Throw an error if the blogRepository call fails', async () => {

        });
    });

    describe('Testing deleteBlogById Function: ', () => {
        it('deleteBlogById: delete a blog by id: ', async () => {

        });

        it('deleteBlogById: Throw an error if the blogRepository call fails', async () => {

        });
    });

});