const userController = require('../../controllers/user.controller');
const userService = require('../../services/user.service');
const userDatabase = require('../databases/user.database');
const {AppError} = require('../../utils/error.handler.util');
const sendResponseInContentNegotiation = require('../../utils/content-negotiation.util')

describe("Testing User Controller: ", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("Return all users in response", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {}
      const next = jest.fn();
      const expectedResponse = {

      }

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(userDatabase);
      jest.spyOn(sendResponseInContentNegotiation, 'sendResponseInContentNegotiation').mockResolvedValue(userDatabase);
      


    });

    it("Throw an error if the userService call fails", async () => {});
  });

  describe("Testing getUserByUsername Function: ", () => {
    it("Return a user response by username", async () => {});

    it(" throw an error user not found if the user is not found", async () => {});

    it("Throw an error if the userService call fails", async () => {});
  });

  describe("Testing updateUserPasswordByUsername Function: ", () => {
    it(" update user password by username and return updated user response", async () => {});

    it(" throw an error if password field is empty", async () => {});

    it(" throw an error if the userService call fails", async () => {});
  });

  describe("Testing deleteUserByUsername Function: ", () => {
    it(" delete a blog by username", async () => {});

    it(" throw an error if the userService call fails", async () => {});
  });
});
