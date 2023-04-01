

const authService = require("../../services/auth.service");
const authDatabase = require("../databases/auth.database");
const userService = require("../../services/user.service");

const { AppError } = require("../../utils/error.handler.util");


describe('Testing Auth Service: ', () => {
    describe('Testing registerUser Function: ', () => {
        it('Register user successfully and return access token', async () => {

            const username = 'test';
            const email = 'test@cefalo.com';
            const password = 'test1234';

            const req = {
              body: {
                username: username,
                email: email,
                password: password,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(authService, 'registerUser')
              .mockResolvedValue(expectedResponse);
            jest
              .spyOn(
                sendResponseInContentNegotiation,
                'sendResponseInContentNegotiation'
              )
              .mockResolvedValue(expectedResponse);
      
            const response = await authController.registerUser(req, res, next);
      
            expect(authService.createBlog).toHaveBeenCalledTimes(1);
            expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('Throw an error if userService.createUser throws an error', async () => {

            const username = 'test';
            const email = 'test@cefalo.com';
            const password = 'test1234';

            const req = {
              body: {
                username: username,
                email: email,
                password: password,
              },
            };
            const res = {};
            const next = jest.fn();

            
            const expectedError = new AppError('Authentication Failed', 401);
      
            jest.spyOn(userService, 'registerUser')
              .mockRejectedValueOnce(expectedError);
      
            await authService.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);


        });

    });

    describe('Testing loginUser Function: ', () => {
        it('Login user successfully and return access token: ', async () => {

            const username = 'test';
            const password = 'test1234';

            const req = {
              body: {
                username: username,
                password: password,
              },
            };
            const res = {};
            const next = jest.fn();
      
            const expectedResponse = {};
      
            jest
              .spyOn(authService, 'loginUser')
              .mockResolvedValue(expectedResponse);
        
      
            const response = await authController.loginUser(req, res, next);
      
            expect(authService.loginUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('Throw an error if UserService.getUserLoginInfo throws an error', async () => {
                const username = 'test';
                const password = 'test1234';
    
                const req = {
                  body: {
                    username: username,
                    password: password,
                  },
                };
                const res = {};
                const next = jest.fn();
    
                const expectedError = new Error("Internal Server Error");
          
                jest.spyOn(userService, 'loginUser')
                  .mockRejectedValueOnce(expectedError);
          
                await authService.loginUser(req, res, next);
                expect(next).toHaveBeenCalledWith(expectedError);

        });

        it('Throw an error if password is not matching', async () => {


            const username = 'test';
            const password = 'test1234';

            const req = {
              body: {
                username: username,
                password: password,
              },
            };
            const res = {};
            const next = jest.fn();

            const expectedError = new AppError("Internal Server Error");
      
            jest.spyOn(userService, 'getUserLoginInfo')
              .mockRejectedValueOnce(expectedError);
      
            await authService.loginUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);


        });
    });

});
