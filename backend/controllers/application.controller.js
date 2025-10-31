import Application from '../models/application.model.js';
import Job from '../models/job.model.js';
import User from '../models/user.model.js';
export const applyJob = async (req, res) => {
  try {
    const  userId  = req.id;
    const  jobId  = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required.', success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.', success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.', success: false });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      // status: 'applied', // Initial status
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({ message: 'Job applied successfully.', success: true, application: newApplication });
  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(500).json({ message: 'An error occurred while applying for the job.' });
  }
}


export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//Admin can see how many applicants have applied for a job
export const getApplicants = async (req, res) => {  
  try {
    const  jobId  = req.params.id;
    // const applications = await Application.find({ job: jobId }).populate('applicant');
    // console.log("Applications found:", applications);
  //   const job = await Job.findById(jobId);
  // console.log("Raw job with application IDs:", job.applications);


    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant'
      }
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found.', success: false });
    }

    return res.status(200).json({ message: 'Applicants retrieved successfully.', success: true, job });
  } catch (error) {
    console.error('Error retrieving applicants:', error);
    return res.status(500).json({ message: 'An error occurred while retrieving applicants.' });
  }
}


export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({ message: 'Application ID and status are required.', success: false });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.', success: false });
    }
    application.status = status.toLowerCase();
    await application.save();


    return res.status(200).json({ message: 'Application status updated successfully.', success: true, application });
  }
  catch (error) {
    console.error('Error updating application status:', error);
    return res.status(500).json({ message: 'An error occurred while updating application status.' });
  }
}
