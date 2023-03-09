class UserDTO {
    constructor(User) {  
      this.users = [];
        
      for (var iterator = 0; iterator < User.length; iterator++) {
        var UserDtoObject = {
          id: User[iterator]["id"],
          username: User[iterator]["username"],
          email: User[iterator]["email"],
          createdAt: User[iterator]["createdAt"],
          updatedAt: User[iterator]["updatedAt"]
        };
        this.users.push(UserDtoObject);
      }
    }
}

module.exports = UserDTO;