const js2xmlparser = require("js2xmlparser");
var jsonToPlainText = require('json-to-plain-text');
var json2html = require('json-to-html')


const sendResponseToClient = (res,statusCode,resposeData)=>{
    res.status(statusCode).send(resposeData);
};


const sendJsonResponse = (req,res,status,message,data)=>{
    const responseData = {status: status, message:message, data:data};
    sendResponseToClient(res,status,responseData);
}

const sendHtmlResponse = (req,res,status,message,data)=>{
    const responseData = json2html(data);
    sendResponseToClient(res,status,responseData);
    
};

const sendXmlResponse = (req,res,status,message,data)=>{
    const responseData = js2xmlparser.parse("data", data);
    sendResponseToClient(res,status,responseData);
};


const sendTextResponse = (req,res,status,message,data)=>{
    const responseData = jsonToPlainText.toPlainText(data);
    sendResponseToClient(res,status,responseData);
};

const sendResponseInContentNegotiation = (req,res,status,message,data)=>{
    const acceptType = req.headers.accept;
    if(acceptType==="application/html"){
        sendHtmlResponse(req,res,status,message,data);
    } else if(acceptType==="application/xml"){
        sendXmlResponse(req,res,status,message,data);
    } else if(acceptType==="application/text"){
        sendTextResponse(req,res,status,message,data);
    } else {
        //sendJsonResponse(req,res,status,message,data);

        sendPlainResponse(req,res,status,message,data);
    }
       
    } 


module.exports = sendResponseInContentNegotiation;