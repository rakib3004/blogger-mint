
exports.isAlphaNumeric = (str) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  };
  
  exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  exports.checkPasswordLength = (password) => {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  };