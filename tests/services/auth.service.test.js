

const authService = require("../../services/auth.service");
const authDatabase = require("../databases/auth.database");
const userService = require("../../services/user.service");
const { AppError } = require("../../utils/error.handler.util");


describe('Testing Auth Service: ', () => {
    describe('Testing registerUser Function: ', () => {
        it('registerUser: Register user successfully and return access token', async () => {

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
              .spyOn(userService, 'createUser')
              .mockResolvedValue(expectedResponse);
       
      
            const response = await authService.registerUser(req, res, next);
      
            expect(userService.createUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('registerUser: Throw an error if userService.createUser throws an error', async () => {

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
      
            jest.spyOn(userService, 'createUser')
              .mockRejectedValueOnce(expectedError);
      
            await authService.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);


        });

    });

    describe('Testing loginUser Function: ', () => {
        it('loginUser: Login user successfully and return access token: ', async () => {

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
              .spyOn(userService, 'getUserLoginInfo')
              .mockResolvedValue(expectedResponse);
        
      
            const response = await authService.loginUser(req, res, next);
      
            expect(userService.loginUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('loginUser: Throw an error if UserService.getUserLoginInfo throws an error', async () => {
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
          
                jest.spyOn(userService, 'getUserLoginInfo')
                  .mockRejectedValueOnce(expectedError);
          
                await authService.loginUser(req, res, next);
                expect(next).toHaveBeenCalledWith(expectedError);

        });

        it('loginUser: Throw an error if password is not matching', async () => {

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

            const expectedError = new AppError('Authentication Failed', 401);
      
            jest.spyOn(userService, 'getUserLoginInfo')
              .mockRejectedValueOnce(expectedError);
      
            await authService.loginUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);

        });
    });

});
