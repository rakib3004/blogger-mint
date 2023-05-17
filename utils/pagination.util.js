

const getPageOffset = (pageNumber,pageSize) => {
  return (pageNumber-1)*pageSize;
};

const getPageLimit = (pageSize) => {
 return pageSize;
};

const getPageNumber = (page) => {
  return (!page||page<=0)? 1: parseInt(page);
 };

 const getPageSize = (limit) => {
  return (!limit||limit<=0)? 5: parseInt(limit);
 };
 

module.exports = {
  getPageOffset, getPageLimit, getPageNumber, getPageSize
};

