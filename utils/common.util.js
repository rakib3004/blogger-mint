
const { v4: uuidv4 } = require("uuid");

const generateUUID = () => {
  return uuidv4();
};

const formatUnixTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours());
  const minitue = String(date.getMinutes());
  const second = String(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minitue}:${second}`;
};


module.exports = {
  formatUnixTimestamp, generateUUID
};
