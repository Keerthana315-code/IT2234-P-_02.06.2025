const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const projectrt = require('./Route/projectRoute');
const taskrt = require('./Route/taskRoute');
const userrt = require('./Route/userRoute');
const errorHandleMid = require('./middlewares/errorHandler')

app.use(express.json())
app.use(errorHandleMid)
app.use('/Project',projectrt)
app.use('/Task',taskrt)
app.use('/User',userrt)


mongoose.connect('mongodb://localhost:27017/RESTfulAPIDB').then(()=>{
    console.log("Database connected")
}).catch((error)=> {
    console.error(error);
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
