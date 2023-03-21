const jsonToXmlConverter = require("xml-js")
const jsonToPlainText = require('json-to-plain-text');
const json2html = require('json-to-html')


const sendResponseToClient = (res,statusCode,resposeData)=>{
    res.status(statusCode).send(resposeData);
};


const sendJsonResponse = (req,res,status,message,data)=>{
    const responseData = {status: status, message:message, data:data};
    sendResponseToClient(res,status,responseData);
}

const sendHtmlResponse = (req,res,status,data)=>{
    //    const responseData = json2html(data);

    let listItemsHtmlData = '';
    for(let item of data){
        listItemsHtmlData+=`<li>id: ${item.id}
                             title: ${item.title}
                            description: ${item.description}
                            </li>`;
                            
    }

    const responseData = `
    <html>
    <head>
        <title>My title</title>
    </head>
    <body>
        <ul>
            ${listItemsHtmlData}
        </ul>
    </body>
</html>`;

 //   res.setHeader('Content-Type', 'application/html');
    sendResponseToClient(res,status,responseData);
    
};

const sendXmlResponse = (req,res,status,data)=>{
    const jsonData = JSON.stringify(data);
    const responseData = jsonToXmlConverter.json2xml(jsonData, {compact: true, spaces: 4})
    sendResponseToClient(res,status,responseData);
};


const sendTextResponse = (req,res,status,data)=>{
 
    let responseDataString = '';

    for(let [key,value]  of Object.entries(data)){

        /*

        responseDataString+=`id: ${item.id}
                            title: ${item.title}
                            description: ${item.description}`
        responseDataString+=`\n\n\n`;

        */

       // for(let [key,value] of Object.entries(item)){
            responseDataString+=`${key}: ${value.id}, ${value.title}, ${value.description}`;
            console.log(key+" "+value);

      //  }
        responseDataString+=`\n\n\n`;
    }
    //res.setHeader('Content-Type', 'application/text');
    sendResponseToClient(res,status,responseDataString);
};

const sendResponseInContentNegotiation = (req,res,status,data)=>{
    const acceptType = req.headers.accept;
    if(acceptType==="application/html"){
        sendHtmlResponse(req,res,status,data);
    } else if(acceptType==="application/xml"){
        sendXmlResponse(req,res,status,data);
    } else if(acceptType==="application/text"){
        sendTextResponse(req,res,status,data);
    } else {
        sendJsonResponse(req,res,status,data);    
        // sendJsonResponse(req,res,status,data);
    }
       
    } 


module.exports = sendResponseInContentNegotiation;