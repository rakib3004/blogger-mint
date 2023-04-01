

describe('Testing Auth Controller: ', () => {
    describe('Testing registerUser Function: ', () => {
        it('Register User Successfully and return access token', async () => {

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

        it('Throw an App eror if username, email and password are missing', async () => {
           
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

        it('Auth Service returns an error and failed to return access token', async () => {
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
      
            jest.spyOn(blogService, 'registerUser')
              .mockRejectedValueOnce(expectedError);
      
            await blogController.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });


        describe('Testing loginUser Function: ', () => {
            it('User login Successfully and return access token', async () => {

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
    
            it('Throw an App eror if username and password are missing', async () => {
    
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
    
            it('Auth Service returns an error and failed to return access token', async () => {
    
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
          
                jest.spyOn(blogService, 'loginUser')
                  .mockRejectedValueOnce(expectedError);
          
                await blogController.loginUser(req, res, next);
                expect(next).toHaveBeenCalledWith(expectedError);

            });
        });
    });

});
