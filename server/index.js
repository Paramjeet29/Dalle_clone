import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'



const app=express();
// const mongoose= require("mongoose");



dotenv.config();



app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

//this is to know if the application is running while we visit the url
app.get('/',async(req,res)=>{
    res.send('Hello from DALL-E!')
})

const startServer=()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8989,()=>console.log('Server has started on port http://localhost:8989'))
    }catch(error){
        console.log(error);
    }
}

startServer();

