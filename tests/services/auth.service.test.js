const authService = require("../../services/auth.service");
const {newUserInfo} = require("../databases/auth.database");
const userService = require("../../services/user.service");
const authUtil = require("../../utils/auth.util");
const UserDTO = require("../../DTO/user.dto");


const { AppError } = require("../../utils/error.handler.util");

describe("Testing Auth Service: ", () => {
  describe("Testing registerUser Function: ", () => {
    it("registerUser: Register user successfully and return access token", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "cefalo123";

      const body={
          username: username,
          email: email,
          password: password,
        };
  
      const dtoUser = new UserDTO(newUserInfo);
      const token = 'some_chunk_of_data';

      const expectedResponse = {
      data: dtoUser,
      token: token,
      };
      jest.spyOn(userService, "createUser").mockResolvedValue(dtoUser);

      jest.spyOn(authUtil, "generateJwtToken").mockResolvedValue(token);

      const response = await authService.registerUser(body);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(authUtil.generateJwtToken).toHaveBeenCalledTimes(1);

      expect(response).toEqual(expectedResponse);
    });

    it("registerUser: Throw an error if userService.createUser throws an error", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "cefalo123";

      const  body= {
          username: username,
          email: email,
          password: password,
        };


      const expectedError = new Error("Internal Server Error");

      jest
        .spyOn(userService, "createUser")
        .mockRejectedValueOnce(expectedError);

      await expect(authService.registerUser(body)).rejects.toThrow(expectedError);
    });
  });

  describe("Testing loginUser Function: ", () => {
    it("loginUser: Login user successfully and return access token: ", async () => {
      const username = "test";
      const password = "cefalo123";

     const body= {
          username: username,
          password: password,
        };
      
        const userResponse = { username: 'testuser', password: '$2b$10$xPvxPvScRo1', email: 'testuser@example.com' };


      const expectedResponse = 'json-web-token';

      jest
        .spyOn(userService, "getUserLoginInfo")
        .mockResolvedValue(userResponse);
        jest
        .spyOn(authUtil, "comparePassword")
        .mockResolvedValue(true);

        jest
        .spyOn(authUtil, "generateJwtToken")
        .mockResolvedValue(expectedResponse);


      const response = await authService.loginUser(body);

      expect(userService.getUserLoginInfo).toHaveBeenCalledTimes(1);
      expect(authUtil.comparePassword).toHaveBeenCalledTimes(1);
      expect(authUtil.generateJwtToken).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it("loginUser: Throw an error if UserService.getUserLoginInfo throws an error", async () => {
      const username = "test";
      const password = "cefalo123";

     const body= {
          username: username,
          password: password,
        };
      
   
  


      const expectedError = new Error("Internal Server Error");
      jest
      .spyOn(userService, 'getUserLoginInfo')
      .mockRejectedValueOnce(expectedError);

      await expect(authService.loginUser(body)).rejects.toThrow(expectedError);

    });

    it("loginUser: Throw an error if password is not matching", async () => {
      const username = "test";
      const password = "cefalo123";

     const body= {
          username: username,
          password: password,
        };
      
        const userResponse = { username: 'testuser', password: '$2b$10$xPvxPvScRo1', email: 'testuser@example.com' };

      jest
        .spyOn(userService, "getUserLoginInfo")
        .mockResolvedValue(userResponse);
        jest
        .spyOn(authUtil, "comparePassword")
        .mockResolvedValue(false);

      const expectedError = new AppError("Authentication Failed", 401);
     

      await expect(authService.loginUser(body)).rejects.toThrow(expectedError);
    });
  });
});
