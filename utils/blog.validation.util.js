
const checkEmptyBody = (body) => {
  return !Object.keys(body).length ? true : false;
};

const checkValidBlogBody= (body)=>{

  if (checkEmptyBody(body)) {
    return { valid: false, message: "Request body is empty" };
  }

  const title = body.title;
  const description = body.description;

  if (!title) {
    return { valid: false, message: "Title field is empty" };
  }

  if (!description) {
    return { valid: false, message: "Description field is empty" };
  }
  return { valid: true ,message: 'Ok', };

}

const checkEmptyTitleAndDescription= (body)=>{

  if (checkEmptyBody(body)) {
    return { isEmpty: true, message: "Request body is empty" };
  }
  
  const title = body.title;
  const description = body.description;

  if (!description && !title) {
    return {
      isEmpty: true,
      message: 'Both description and title fields are empty',
    };
  }
  return { isEmpty: false,message: 'Ok', };

}

module.exports = {
    checkValidBlogBody,checkEmptyTitleAndDescription
  };