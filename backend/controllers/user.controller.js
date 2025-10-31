import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import isAuthenticated from '../middleware/isAuthenticated.js';
import { get } from 'http';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    // Simulate user registration logic
    const { fullname,email,phoneNumber,password,role } = req.body;
    if (!fullname) {
      return res.status(400).json({ message: 'Some details are missing' ,success:false});
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists', success:false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role, // Default role, can be changed later
      profile:{
        profilePhoto: cloudResponse.secure_url,
      }
    }); 
    // Here you would typically save the user to the database
    // For this example, we will just return a success message
    return res.status(201).json({ message: 'User registered successfully', success:true });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req, res) => {
  try {
    // Simulate user login logic
    const { email, password,role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email,password and role are required', success:false });
    }
    
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', success:false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password', success:false });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch', success:false });
    }

    const tokenData={
        userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user={
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
    }

    return res.status(200).cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: 'Strict', 
    }).json({ message: 'Login successful', user, success:true });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const logout = async (req, res) => {
  try {
    
    return res.status(200).cookie("token","",{maxAge:0}).json({ message: 'Logout successful', success:true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log( fullname, email, phoneNumber, bio, skills);
    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content); 
    //cloudinary comes here...
    let skillsArray;
    if(skills){
       skillsArray = skills.split(',');
    }
    
    const userId=req.id;//middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success:false });
    }
    // Update user profile
    if(fullname) user.fullname = fullname;
    if(email)  user.email = email; 
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(bio) user.profile.bio = bio;
    if(skills) user.profile.skills = skillsArray;
           
   
    //resume comes later here...
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url
      user.profile.resumeOriginalName= file.originalname
      ;
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      
      
    };
    return res.status(200).json({ message: 'Profile updated successfully', user, success:true });
    } 
  catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Internal server error here', success:false });
  }
}


