const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

let PORT = process.env.PORT || 5000;

app.post("/user/generatetoken", (req,res)=>{
    let jwtsecretkey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtsecretkey);
    res.send(token);
})

app.get("/user/validatetoken",(req,res)=>{

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey =  process.env.JWT_SECRET_KEY;
    try{
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey)
        if(verified){
            return res.send("Successfully Verified")
        }else{
            return res.status(401).send()
        }
    } catch(error){
        return res.status(401).send(error);
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})