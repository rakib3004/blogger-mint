const userController = require("../../controllers/user.controller");
const userService = require("../../services/user.service");
const userDatabase = require("../databases/user.database");
const { AppError } = require("../../utils/error.handler.util");
const sendResponseInContentNegotiation = require("../../utils/content-negotiation.util");

describe("Testing User Controller: ", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("Return all users in response", async () => {
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
        .spyOn(userService, "getAllUsers")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          "sendResponseInContentNegotiation"
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("Throw an error if the userService call fails", async () => {
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
    it("Return a user response by username", async () => {
      const req = {
        params: {
          username: "tester",
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedResponse = {};

      jest
        .spyOn(userService, "getUserByUsername")
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          "sendResponseInContentNegotiation"
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.getUserByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it(" throw an error user not found if the user is not found", async () => {

      const req = {
        params: {
          username: "annonymous",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new AppError('User not found',404);

      jest.spyOn(userService, 'getUserByUsername').mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req,res,next);

      expect(next).toHaveBeenCalledWith(expectedError);

    });

    it("Throw an error for bad request", async () => {

      const req = {};
      const res = {};
      const next = jest.fn();


      const expectedError = new AppError('Bad Request',400);


      jest.spyOn(userService, 'getUserByUsername').mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req,res,next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });


    it("Throw an error if the userService call fails", async () => {

      const req = {
        params: {
          username: "tester",
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
    it(" update user password by username and return updated user response", async () => {

      const req = {
        params: {
          username: "tester",
        },
        body: {
          password: "test123",
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedResponse = {};

      jest
        .spyOn(userService, 'updateUserPasswordByUsername')
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          "sendResponseInContentNegotiation"
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.updateUserPasswordByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);


    });

    it(" throw an error if password field is empty", async () => {});

    it(" throw an error if the userService call fails", async () => {});
  });

  describe("Testing deleteUserByUsername Function: ", () => {
    it(" delete a blog by username", async () => {


      const req = {
        params: {
          username: "tester",
        },
      
      };
      const res = {};
      const next = jest.fn();

      const expectedResponse = {};

      jest
        .spyOn(userService, 'deleteUserByUsername')
        .mockResolvedValue(expectedResponse);
      jest
        .spyOn(
          sendResponseInContentNegotiation,
          "sendResponseInContentNegotiation"
        )
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.deleteUserByUsername).toHaveBeenCalledTimes(1);
      expect(sendResponseInContentNegotiation).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);

    });

    it(" throw an error if the userService call fails", async () => {});
  });
});
