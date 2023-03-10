class UserDTO {
    constructor(Users) {  
      this.users = [];
        
      for (var iterator = 0; iterator < Users.length; iterator++) {
        var userDtoObject = {
          id: Users[iterator]["id"],
          username: Users[iterator]["username"],
          email: Users[iterator]["email"],
          createdAt: Users[iterator]["createdAt"],
          updatedAt: Users[iterator]["updatedAt"]
        };
        this.users.push(userDtoObject);
      }
    }
}

module.exports = UserDTO;