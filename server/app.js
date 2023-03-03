const express = require('express');
const app = express();
const authorRouter = require('./routes/author.route');
const blogRouter =  require('./routes/blog.route');
const PORT = process.env.PORT || 8000;

app.use(express.json({extended: false}));

app.use('/author',authorRouter);
app.use('/blog', blogRouter);

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
})
