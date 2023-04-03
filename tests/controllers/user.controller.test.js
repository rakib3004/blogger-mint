const userController = require("../../controllers/user.controller");
const userService = require("../../services/user.service");
const {fullUserList} = require("../databases/user.database");
const { AppError } = require("../../utils/error.handler.util");
const sendResponseInContentNegotiation = require("../../utils/content-negotiation.util");

describe("Testing User Controller: ", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("getAllUsers: Return all users in response", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = fullUserList;

      jest
        .spyOn(userService, "getAllUsers")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          'sendResponseInContentNegotiation'
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("getAllUsers: Throw an error if the userService call fails", async () => {
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
        .spyOn(userService, "getAllUsers")
        .mockRejectedValueOnce(expectedError);

      await userController.getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Testing getUserByUsername Function: ", () => {
    it("getUserByUsername: Return a user response by username", async () => {

      const username = "test";
      const req = {
        params: {
          username: username,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedResponse = {
        "user": {
            "id": "11af8088-2fd6-449b-9b57-7cc36e757ab1",
            "username": "test",
            "email": "test@cefalo.com",
            "createdAt": "2023-04-03T02:12:16.000Z",
            "updatedAt": "2023-04-03T03:18:09.000Z"
        }
    };

      jest
        .spyOn(userService, "getUserByUsername")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          'sendResponseInContentNegotiation'
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getUserByUsername(req, res, next);

      expect(userService.getUserByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it("getUserByUsername: throw an error user not found if the user is not found", async () => {

      const username = "annonymous";
      const req = {
        params: {
          username: username,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new AppError('User not found',404);

      jest.spyOn(userService, 'getUserByUsername').mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req,res,next);

      expect(next).toHaveBeenCalledWith(expectedError);

    });

    it("getUserByUsername: Throw an error for bad request", async () => {

      const req = {};
      const res = {};
      const next = jest.fn();


      const expectedError = new AppError('Bad Request',400);


      jest.spyOn(userService, 'getUserByUsername').mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req,res,next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });


    it("getUserByUsername: Throw an error if the userService call fails", async () => {

    const username = "test";

      const req = {
        params: {
          username:username,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(userService, 'getUserByUsername')
        .mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);


    });
  });

  describe("Testing updateUserPasswordByUsername Function: ", () => {
    it("updateUserPasswordByUsername: update user password by username and return updated user response", async () => {

      const username = "test";
      const password = "cefalo123";
      const req = {
        params: {
          username: username,
        },
        body: {
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
                "updatedAt": "2023-04-03T02:12:16.000Z"
            }
        },
        "message": "Password is successfully updated"
    };

      jest
        .spyOn(userService, 'updateUserPasswordByUsername')
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          'sendResponseInContentNegotiation'
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.updateUserPasswordByUsername(req, res, next);

      expect(userService.updateUserPasswordByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);


    });

    it("updateUserPasswordByUsername: throw an error if password field is empty", async () => {

      const username = "test";
      const req = {
        params: {
          username: username,
        },
        body: {},
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError('Password field is empty',400);


      jest.spyOn(userService, 'updateUserPasswordByUsername').mockRejectedValueOnce(expectedError);

      await userController.updateUserPasswordByUsername(req,res,next);

      expect(next).toHaveBeenCalledWith(expectedError);


    });

    it("updateUserPasswordByUsername: throw an error if the userService call fails", async () => {

      const username = "test";
      const password = "cefalo123";
      const req = {
        params: {
          username: username,
        },
        body: {
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(userService, 'updateUserPasswordByUsername')
        .mockRejectedValueOnce(expectedError);

      await userController.updateUserPasswordByUsername(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);

    });
  });

  describe("Testing deleteUserByUsername Function: ", () => {
    it("deleteUserByUsername: delete a blog by username", async () => {
      const req = {
        params: {
          username: "test",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        "data": 1,
        "message": "User is successfully deleted"
    };

      jest
        .spyOn(userService, 'deleteUserByUsername')
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          'sendResponseInContentNegotiation'
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.deleteUserByUsername(req, res, next);

      expect(userService.deleteUserByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);

    });

    it("deleteUserByUsername: throw an error if the userService call fails", async () => {

      const username = "test";
      const req = {
        params: {
          username: username,
        },
      
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(userService, "deleteUserByUsername")
        .mockRejectedValueOnce(expectedError);

      await userController.deleteUserByUsername(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);

    });
  });
});
