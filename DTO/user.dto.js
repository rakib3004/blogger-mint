class SingleUserDTO {
  constructor(user) {
    const userDtoSingleObject = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    this.user = userDtoSingleObject;
  }
}

module.exports = SingleUserDTO;
