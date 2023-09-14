// import express from 'express'
// import *as dotenv from 'dotenv'
// import {v2 as cloudinary } from 'cloudinary';

// import Post from '../mongodb/models/post.js';

// dotenv.config();

// const router=express.Router();

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,
// })

// //GET ALL POSTS
// router.route('/').get(async(req,res)=>{
//     try{
//         //Post is the schema or model in mongodb
//         const posts=await Post.find({})
//         res.status(200).json({success:true,data:posts})
//     }catch(error){
//         res.status(500).json({success:false,message:'unable to fetch post'})   
//     }
// })

// //CREATE POST
// router.route('/').post(async(req,res)=>{
//     try{
//         const{name,prompt,photo}=req.body; //this is coming form frontend
//         const photoUrl=await cloudinary.uploader.upload(photo);//uploading it to cloudinary and getting photoUrl as optimised url

//         //will create a new post in database
//         const newPost=await Post.create({
//             name,
//             prompt,
//             photo:photoUrl.url,
//         })

//         res.status(200).json({sucess:true,data:newPost})
//     }catch(error){
//         res.status(500).json({success:false,message:'Unable to create a post'})
//     }
// })
// export default router;

import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch posts' });
  }
});

// CREATE POST
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Validate required fields
    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Unable to create a post' });
  }
});

export default router;
