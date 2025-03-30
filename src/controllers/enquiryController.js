const Enquiry = require('../models/enquiryModel');

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    await Enquiry.create({ name, email, phone, message });
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
