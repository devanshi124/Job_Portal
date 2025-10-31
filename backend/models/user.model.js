import mongoose from "mongoose";    
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['student', 'recruiter'], // Define roles
    required: true,
  },
  profile: {
    bio:{type:String},
    skills: { type: [String], default: [] }, // Array of skills
    resume: { type: String }, // URL or path to resume file
    resumeOriginalName: { type: String }, // Original name of the resume file
    company : { type: mongoose.Schema.Types.ObjectId,ref:'Company' }, // Company name for recruiters
    profilePhoto: { type: String ,default:""}, // URL or path to profile photo
},    
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});
const User=mongoose.model("User", userSchema);
export default User;

