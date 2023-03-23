const getPageOffset = (pageNumber, pageSize) => (pageNumber - 1) * pageSize;

const getPageLimit = (pageSize) => pageSize;
module.exports = {
    getPageOffset,
    getPageLimit,
};
