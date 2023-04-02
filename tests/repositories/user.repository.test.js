const userRepository = require("../../repositories/user.repository");
const userDatabase = require("../databases/user.database");
const {User} = require("../models");


describe('Testing User Repository: ', () => {
    describe('Testing getAllUsers Function: ', () => {
        it('getAllUsers: Return an array of users: ', async () => {

            const query = {
                page: 1,
                limit: 5,
            };
      
            const expectedResponse = {};
            jest
              .spyOn(User, 'getAllUsers')
              .mockResolvedValue(expectedResponse);
            
            const response = await userRepository.getAllUsers(query);
            expect(User.getAllUsers).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

        it('getAllUsers: Throw an error for database query error', async () => {

            const query = {
                page: 1,
                limit: 5,
            };
          const expectedError = new Error("Internal Server Error");

            jest
              .spyOn(User, 'getAllUsers')
              .mockRejectedValueOnce(expectedError);
              await expect(userRepository.getAllUsers(query)).rejects.toThrow(expectedError);


        });
    });

    
    describe('Testing createUser Function: ', () => {
        it('createUser: create an user and return a user body: ', async () => {

            const username = "test";
            const email =  "test@cefalo.com";
            const password = "test";
          
            const body = {
                username: username,
                email :email,
                password :password,
            };
                  
            const expectedResponse = {};
      
            jest
              .spyOn(User, 'createUser')
              .mockResolvedValue(expectedResponse);
            const response = await userRepository.createUser(body);
      
            expect(User.createUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);     


        });

        it('createUser: Throw an error for database query error', async () => {

            const id = "16514651474";
            const username = "test";
            const email =  "test@cefalo.com";
        
            const password = "test";
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
        
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(User, 'createUser')
              .mockRejectedValueOnce(expectedError);
              await expect(userRepository.createUser(body)).rejects.toThrow(expectedError);

        });
    });



    describe('Testing getUserByUsername Function: ', () => {
        it('getUserByUsername: Return a user by username: ', async () => {

            const id = "16514651474";
            const expectedResponse = {};
            jest
              .spyOn(User, 'getUserByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userRepository.getUserByUsername(id);
            expect(User.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);


        });

        it('getUserByUsername: Return 0 if the user does not exist', async () => {

            const id = "16514651474";
            const expectedError = new AppError("User not found",404);
            jest.spyOn(User, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);
              await expect(userRepository.getUserByUsername(id)).rejects.toThrow(expectedError);

              
        });

        it('getUserByUsername: Throw an error for database query error', async () => {
            const id = "16514651474";
            const expectedError = new Error("Internal Server Error");
            jest
              .spyOn(User, 'getUserByUsername')
              .mockRejectedValueOnce(expectedError);
              await expect(userRepository.getUserByUsername(id)).rejects.toThrow(expectedError);
              
        });
    });



    describe('Testing updateUserPasswordByUsername Function: ', () => {
        it('updateUserPasswordByUsername: update a user password by username', async () => {

            const id = "16514651474";
            const password = "test";
          
            const body = {
                password :password,
            };
            const expectedResponse = {};
      
            jest
              .spyOn(User, 'updateUserPasswordByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userRepository.updateUserPasswordByUsername(body, id);
      
            expect(User.updateUserPasswordByUsername).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);

        });

       
        it('updateUserPasswordByUsername: Throw an error for database query error', async () => {

            const id = "16514651474";
            const body = {
                password :password,
            };
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(User, 'updateUserPasswordByUsername')
              .mockRejectedValueOnce(expectedError);

              await expect(userRepository.updateUserPasswordByUsername(body,id)).rejects.toThrow(expectedError);

              
        });
    });

    describe('Testing deleteUserByUsername Function: ', () => {
        it('deleteUserByUsername: delete a user by username: ', async () => {

            const id = "16514651474";
            const expectedResponse = {};

            jest
              .spyOn(User, 'deleteUserByUsername')
              .mockResolvedValue(expectedResponse);
            
            const response = await userRepository.deleteUserByUsername(id);
      
            expect(User.deleteUserByUsername).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });



        it('deleteUserByUsername: Throw an error for database query error', async () => {

            const id = "16514651474";
           
            const expectedError = new Error("Internal Server Error");
      
            jest
              .spyOn(User, 'deleteUserByUsername')
              .mockRejectedValueOnce(expectedError);

              await expect(userRepository.deleteUserByUsername(id)).rejects.toThrow(expectedError);
          

        });
    });
});
