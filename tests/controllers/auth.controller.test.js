const authController = require("../../controllers/auth.controller");
const authService = require("../../services/auth.service");
const { newUserInfo } = require("../databases/auth.database");
const userValidationUtil = require("../../utils/user.validation.util");

const { AppError } = require("../../utils/error.handler.util");
const contentNegotiation = require("../../utils/content-negotiation.util");



describe("Testing Auth Controller: ", () => {
  
  describe("Testing registerUser Function: ", () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("registerUser: Register User Successfully and return access token", async () => {
      const username = "test";
      const email = "test@cefalo.com";
      const password = "test1234";

      const req = {
        body: {
          username: username,
          email: email,
          password: password,
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();

      const expectedInfo = {
        data: newUserInfo,
        token: "json-web-token",
      };

      const expectedResponse = {
        data: newUserInfo,
        message: "Registration is successful",
      };

      jest.spyOn(authService, "registerUser").mockResolvedValue(expectedInfo);

      jest
        .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
        .mockResolvedValue(expectedResponse);

      const response = await authController.registerUser(req, res, next);

      expect(authService.registerUser).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(
        contentNegotiation.sendResponseInContentNegotiation
      ).toHaveBeenCalledTimes(1);

      expect(res.cookie).toHaveBeenCalledWith("jwt", "json-web-token", {
        httpOnly: true,
      });

    

      contentNegotiation.sendResponseInContentNegotiation.mockClear();
      expect(response).toBe(expectedResponse);
    });

    it("registerUser: Throw an App eror if username, email or password any field is missing", async () => {

      const username = "test";
      const password = "test1234";
      const req = {
        body: {
          username: username,
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("email field is Empty", 400);

      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);

      jest
        .spyOn(userValidationUtil, "checkValidRegistration")
        .mockReturnValueOnce({ valid: true, message: "email field is Empty" });

      await authController.registerUser(req, res, next);
      expect(userValidationUtil.checkValidRegistration).toHaveBeenCalledTimes(
        1
      );


      expect(next).toHaveBeenCalledWith(expectedError);
      next.mockClear();

      

    });

    it("registerUser: Throw an app eror if request body is empty", async () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new AppError("Request body is empty", 400);

      jest
        .spyOn(authService, "registerUser")
        .mockRejectedValueOnce(expectedError);
      jest
        .spyOn(userValidationUtil, "checkValidRegistration")
        .mockReturnValueOnce({
          valid: false,
          message: "Request body is empty",
        });

      await authController.registerUser(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
      next.mockClear();
    });

  /* it('registerUser: Auth Service returns an error', async () => {
   

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
            

            jest
            .spyOn(userValidationUtil, "checkValidRegistration")
            .mockReturnValueOnce({
              valid: true,
              message: "Ok",
            });
      
            jest.spyOn(authService, 'registerUser')
              .mockRejectedValueOnce(expectedError);
      
            await authController.registerUser(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
*/
    describe("Testing loginUser Function: ", () => {
      it("loginUser: User login Successfully", async () => {
        const username = "test";
        const password = "test1234";

        const req = {
          body: {
            username: username,
            password: password,
          },
        };
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedResponse = {
          message: "Login is successful",
        };

        jest
          .spyOn(userValidationUtil, "checkValidLogin")
          .mockReturnValueOnce({ valid: true });

        jest
          .spyOn(authService, "loginUser")
          .mockResolvedValue(expectedResponse);

        jest
          .spyOn(contentNegotiation, "sendResponseInContentNegotiation")
          .mockResolvedValue(expectedResponse);

        const response = await authController.loginUser(req, res, next);

        expect(authService.loginUser).toHaveBeenCalledTimes(1);
        expect(res.cookie).toHaveBeenCalledTimes(1);
        expect(
          contentNegotiation.sendResponseInContentNegotiation
        ).toHaveBeenCalledTimes(1);

        contentNegotiation.sendResponseInContentNegotiation.mockClear();
        expect(response).toBe(expectedResponse);
      });

      it("loginUser: Throw an App eror if username and password are missing", async () => {
        const req = {};
        const res = { cookie: jest.fn() };
        const next = jest.fn();

        const expectedError = new AppError("Request body is empty", 400);

        jest
          .spyOn(userValidationUtil, "checkValidLogin")
          .mockReturnValueOnce({
            valid: true,
            message: "Request body is empty",
          });

        jest
          .spyOn(authService, "loginUser")
          .mockRejectedValueOnce(expectedError);

        await authController.loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expectedError);
      });

        it('loginUser: Auth Service returns an error', async () => {
    
          const req = {};
          const res = { cookie: jest.fn() };
          const next = jest.fn();
  
          const expectedError = new Error("Internal Server Error");
  
          jest
            .spyOn(userValidationUtil, "checkValidLogin")
            .mockReturnValueOnce({
              valid: true,
              message: "Request body is empty",
            });
  
          jest
            .spyOn(authService, "loginUser")
            .mockRejectedValueOnce(expectedError);
  
          await authController.loginUser(req, res, next);
          expect(next).toHaveBeenCalledWith(expectedError);

            });
    });
  });
});
