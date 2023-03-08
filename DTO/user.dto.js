class UserDTO {
    constructor(User) {
      
      this.users = [];
        
      for (var iterator = 0; iterator < User.length; iterator++) {
        var UserDtoObject = {
          Id: User[iterator]["Id"],
          Username: User[iterator]["Username"],
          Email: User[iterator]["Email"],
          CreatedAt: User[iterator]["CreatedAt"],
          UpdatedAt: User[iterator]["UpdatedAt"]
        };
        this.users.push(UserDtoObject);
      }
    }
}

module.exports = UserDTO;