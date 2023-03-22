const jsonToXmlConverter = require("xml-js")
const jsonToPlainText = require("json-to-plain-text");
const jsonToHtml = require('json-to-html')


const sendResponseToClient = (res,statusCode,resposeData)=>{
    res.status(statusCode).send(resposeData);
};


const sendJsonResponse = (req,res,status,message,data)=>{
    const responseData = {message:message, data:data};
    sendResponseToClient(res,status,responseData);
}

const sendHtmlResponse = (req,res,status,data)=>{
   const responseData = jsonToHtml(data);
    sendResponseToClient(res,status,responseData);
};

const sendXmlResponse = (req,res,status,data)=>{
    const jsonData = JSON.stringify(data);
    const responseData = jsonToXmlConverter.json2xml(jsonData, {compact: true, spaces: 4})
    sendResponseToClient(res,status,responseData);
};



const sendTextResponse = (req,res,status,data)=>{
    const responseData = jsonToPlainText.toPlainText(JSON.parse(JSON.stringify(data)));
    sendResponseToClient(res,status,responseData);
};

const sendResponseInContentNegotiation = (req,res,status,data)=>{
    const acceptType = req.headers.accept;
    if(acceptType==="application/html"){
        sendHtmlResponse(req,res,status,data);
    } else if(acceptType==="application/xml"){
        sendXmlResponse(req,res,status,data);
    } else if(acceptType==="text/plain"){
        sendTextResponse(req,res,status,data);
    } else {
        sendJsonResponse(req,res,status,data);    
    }
       
    } 


module.exports = sendResponseInContentNegotiation;