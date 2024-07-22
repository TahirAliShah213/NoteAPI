const userModel = require("../models/user");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req,res) => {
    // Existing user check
    // Hashed Password
    // User Creation
    // Token Generate

    const {username,email,password} = req.body;
    try{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message : "User Already exists"});
        }

        const hashedPassword = await bycrpt.hash(password,10);
        const result = await userModel.create({
            email : email,
            username: username,
            password: hashedPassword

    });

    const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
    res.status(201).json({user:result,token:token});

    } catch (error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const signin = async (req,res) => {

    try{
        const {email,password} = req.body;

        const existingUser = await userModel.findOne({email:email});
       
        if(!existingUser){
            return res.status(404).json({message : "User not exists"});
        }
    
        const matchpassword = await bycrpt.compare(password,existingUser.password);
        if(!matchpassword){
            res.status(400).json({message:"password not mached"});
        }
    
        const token = jwt.sign({email: existingUser.email, id: existingUser._id},SECRET_KEY);
        res.status(200).json({user: existingUser,token:token});
    
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});

    }

   }

module.exports = { signup,signin }