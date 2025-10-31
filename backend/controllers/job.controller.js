import path from 'path';
import Job from '../models/job.model.js';

//admin will post job
// export const postJob = async (req, res) => {
//   try {
//     const { title, description, location, salary, companyId,requirements,jobType,experience,position } = req.body;
//     const userId = req.id; // Assuming req.id is set by the authentication middleware

//     if (!title || !description || !location || !salary || !companyId || !requirements || !jobType || !experience || !position) {    
//       return res.status(400).json({ message: 'All fields are required', success: false });
//     }
//     const job =await Job.create({
//         title,
//         description,
//         location,
//         salary,
//         company: companyId, // Assuming companyId is the ID of the company posting the job
//         requirements: requirements.split(','), // Assuming requirements are passed as a comma-separated string
//         jobType,
//         experienceLevel: experience, // Assuming experience is a number representing the level
//         position,
//         created_by :userId // Assuming position is a number or string representing the job position
        
//     });
//     return res.status(201).json({ message: 'Job posted successfully', job, success: true });
//   } catch (error) {
//     console.error('Job posting error:', error);
//     return res.status(500).json({ message: 'Internal server error', success: false });
//   }
// }
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//student 
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Assuming the job ID is passed as a URL parameter
    const job = await Job.findById(jobId).populate({path:"applications"}); // Populate company name
    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  } 
}

//Admin can see the jobs posted by them

// export const getAdminJobs = async (req, res) => {
//   try {
//     const adminId = req.id; // Assuming req.id is set by the authentication middleware
//      const jobs = await Job.find({ created_by: adminId }).populate({
//             path:'company',
//             createdAt:-1
//         });
//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ message: 'No jobs found for this user', success: false });
//     }
//     return res.status(200).json({ jobs, success: true });
//   } catch (error) {
//     console.error('Error fetching admin jobs:', error);
//     return res.status(500).json({ message: 'Internal server error', success: false });
//   }
//  } 
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}