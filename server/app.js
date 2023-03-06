const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/', (req,res)=>{

    const homeData=  [
        {
            "Id" : 1, 
            "deviceName": "Windows 11",
            "RAM": "16 GB",
            "CreatedAt": "01-01-19",
            "UpdatedAt": "06-03-23"
        
        },
        
        {
            "Id" : 2, 
            "deviceName": "Ubuntu 20",
            "RAM": "4GB",
            "CreatedAt": "02-01-20",
            "UpdatedAt": "25-02-23"
        
        },
      ]      
    res.send(homeData);
});

app.use('/users',userRouter);

app.use((err, req, res, next) => {
    if(err.name == 'ValidationError'){
        var valErrors = [];
    valErrors.push('Server Crashed!!!')
        Object.keys(err.errors).forEach( key => valErrors.push(err.errors[key].message) );
        res.status(422).send(valErrors)
    }
});


app.listen(PORT, ()=>{
    console.log('Server is running ... ... ...');
});