
const authController = require("../../controllers/auth.controller");
const authService = require("../../services/auth.service");
const authDatabase = require("../databases/auth.database");
const { AppError } = require("../../utils/error.handler.util");
const sendResponseInContentNegotiation = require("../../utils/content-negotiation.util");

describe('Testing Auth Controller: ', () => {
    describe('Testing registerUser Function: ', () => {
        it('registerUser: Register User Successfully and return access token', async () => {

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
      
            const expectedResponse = {
              "data": {
                  "user": {
                      "id": "11af8088-2fd6-449b-9b57-7cc36e757ab1",
                      "username": "test",
                      "email": "test@cefalo.com",
                      "createdAt": "2023-04-03T02:12:16.000Z",
                      "updatedAt": "2023-04-03T02:12:16.548Z"
                  }
              },
              "message": "Registration is successful"
          };
      
            jest
              .spyOn(authService, 'registerUser')
              .mockResolvedValue(expectedResponse);
 
      
            const response = await authController.registerUser(req, res, next);
      
            expect(authService.registerUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);



        });

        it('registerUser: Throw an App eror if username, email and password are missing', async () => {
           
            const req = {
              body: {
        
              },
            };
            const res = {};
            const next = jest.fn();

            const expectedError = new AppError('Request body is empty', 400);
      
            jest.spyOn(authService, 'registerUser')
              .mockRejectedValueOnce(expectedError);

            await authController.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
            
        });

        it('registerUser: Auth Service returns an error and failed to return access token', async () => {
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
            const expectedError = new Error("Internal Server Error");
      
            jest.spyOn(authService, 'registerUser')
              .mockRejectedValueOnce(expectedError);
      
            await authController.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });


        describe('Testing loginUser Function: ', () => {
            it('loginUser: User login Successfully', async () => {

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
          
                const expectedResponse = {
                  "message": "Login is successful"
              };
          
                jest
                  .spyOn(authService, 'loginUser')
                  .mockResolvedValue(expectedResponse);
                jest
                  .spyOn(
                    sendResponseInContentNegotiation,
                    'sendResponseInContentNegotiation'
                  )
                  .mockResolvedValue(expectedResponse);
          
                const response = await authController.loginUser(req, res, next);
          
                expect(authService.loginUser).toHaveBeenCalledTimes(1);
                expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
                expect(response).toBe(expectedResponse);


            });
    
            it('loginUser: Throw an App eror if username and password are missing', async () => {
    
                const req = {
                    body: {
              
                    },
                  };
                  const res = {};
                  const next = jest.fn();
      
                  const expectedError = new AppError('Request body is empty', 400);
            
                  jest.spyOn(authService, 'loginUser')
                    .mockRejectedValueOnce(expectedError);
      
                  await authController.loginUser(req, res, next);
                  expect(next).toHaveBeenCalledWith(expectedError);

            });
    
            it('loginUser: Auth Service returns an error', async () => {
    
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
          
                jest.spyOn(authService, 'loginUser')
                  .mockRejectedValueOnce(expectedError);
          
                await authController.loginUser(req, res, next);
                expect(next).toHaveBeenCalledWith(expectedError);

            });
        });
    });

});
