require('dotenv').config()

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken')

app.use(express.json()); // allow to use json

const posts = [
    {
        username: 'Yash',
        title: 'Post 1'
    },
    {
        username: 'Kir',
        title: 'Post 2'
    },
    {
        username: 'Rohit',
        title: 'Post 3'
    },
]

app.get("/posts", authenticateTokens, (req,res) =>{
   res.json(posts.filter(post => post.username === req.user.name))
})



function authenticateTokens(req,res,next){
   const authHeader = req.headers['authorization'];
   const token = authHeader.split(' ')[1];
   if(token == null)return res.sendStatus(401) // unauthorize error
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    if(err) return res.sendStatus(403) //you hace a token but it is not valid
    req.user = user;
    next();
   })
}

app.listen(3000, () =>{
   console.log("Server Started");
})