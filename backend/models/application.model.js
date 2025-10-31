import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String, // URL or path to the resume file
    enum:['pending', 'accepted', 'rejected'], // Define possible statuses
    default: 'pending', // Default status when an application is created
  },

}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Application = mongoose.model("Application", applicationSchema);
export default Application; 