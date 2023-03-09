class UserDTO {
    constructor(User) {
      
      this.users = [];
        
      for (var iterator = 0; iterator < User.length; iterator++) {
        var UserDtoObject = {
          id: User[iterator]["Id"],
          username: User[iterator]["Username"],
          email: User[iterator]["Email"],
          createdAt: User[iterator]["CreatedAt"],
          updatedAt: User[iterator]["UpdatedAt"]
        };
        this.users.push(UserDtoObject);
      }
    }
}

module.exports = UserDTO;