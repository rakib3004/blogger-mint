

const getPageOffset = (pageNumber,pageSize) => {
  return (parseInt(pageNumber)-1)*parseInt(pageSize);
};

const getPageLimit = (pageSize) => {
 return parseInt(pageSize);
};


module.exports = {
  getPageOffset, getPageLimit
};

