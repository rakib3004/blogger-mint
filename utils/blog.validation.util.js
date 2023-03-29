
const checkValidBlogBody= (body)=>{

  const title = body.title;
  const description = body.description;

  if (!title) {
    return { valid: false, message: "title Field is Empty" };
  }

  if (!description) {
    return { valid: false, message: "description Field is Empty" };
  }
  return { valid: true ,message: 'Ok', };

}

const checkEmptyTitleAndDescription= (body)=>{

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