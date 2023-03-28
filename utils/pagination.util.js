

const getPageOffset = (pageNumber,pageSize) => {
  return (pageNumber-1)*pageSize;
};

const getPageLimit = (pageSize) => {
 return pageSize;
};


module.exports = {
  getPageOffset, getPageLimit
};

