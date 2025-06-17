import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    const user=await User.create({name,email,password});
    res.status(201).json({user});
}

export {signup};

const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.status(200).json({token});
}

export {login};
