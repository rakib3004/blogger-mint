const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const PORT = process.env.PORT || 8000;

app.use(express.json());



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