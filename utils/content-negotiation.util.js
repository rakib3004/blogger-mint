const jsonToXmlConverter = require("js2xmlparser")
const jsonToPlainText = require("json-to-plain-text");
const jsonToHtml = require('json-to-html')


const sendResponseToClient = (res,statusCode,resposeData)=>{
    res.status(statusCode).send(resposeData);
};



const sendJsonResponse = (res,status,message,data)=>{
    const responseData = {status: status, message:message, data:data};
     sendResponseToClient(res,status,responseData);
}

const sendHtmlResponse = (res,status,data)=>{
   const responseData = jsonToHtml(data);
    sendResponseToClient(res,status,responseData);
};

const sendXmlResponse = (res,status,data)=>{
    const responseData = jsonToXmlConverter.parse("data", data);
    sendResponseToClient(res,status,responseData);
};



const sendTextResponse = (res,status,data)=>{
    const responseData = jsonToPlainText.toPlainText(JSON.parse(JSON.stringify(data)));
    sendResponseToClient(res,status,responseData);
};

const sendResponseInContentNegotiation = (req,res,status,data)=>{
    const acceptType = req.headers.accept;
    if(acceptType==="application/html"){
        return  sendHtmlResponse(res,status,data);
    } 
    if(acceptType==="application/xml"){
        return  sendXmlResponse(res,status,data);
    } 
    if(acceptType==="text/plain"){
        return  sendTextResponse(res,status,data);
    } 
    return sendJsonResponse(res,status,data);    
    
       
    } 


module.exports = sendResponseInContentNegotiation;