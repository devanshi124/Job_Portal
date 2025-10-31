import Company from '../models/company.model.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName} = req.body;
    const file = req.file;

    if (!companyName ) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: 'Company already exists', success: false });
    }

    company = await Company.create({ name: companyName, userId: req.id });
    return res.status(201).json({ message: 'Company registered successfully', company, success: true });

  } catch (error) {
    console.error('Company registration error:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
}

export const getCompany = async (req, res) => {     
  try {
    const userId = req.id; // Assuming req.id is set by the authentication middleware
    const company = await Company.find({ userId: req.id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found', success: false });
    }
    return res.status(200).json({company, success: true });
}
    catch (error) {
      console.error('Error fetching company:', error);
      return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

//export company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // Assuming the company ID is passed as a URL parameter
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found', success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
}

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id; // Assuming the company ID is passed as a URL parameter
    const { name,descreption,website,location} = req.body;
    const file = req.file;
    const fileUri=getDataUri(file);
    const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
    const logo=cloudResponse.secure_url;
    const updateData ={name,descreption,website,location,logo};
    
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found', success: false });
    }

    // company.name = companyName;
    // company.email = email;
    // company.phoneNumber = phoneNumber;
    // company.address = address;

   

    await company.save();
    return res.status(200).json({ message: 'Company updated successfully', company, success: true });

  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
}