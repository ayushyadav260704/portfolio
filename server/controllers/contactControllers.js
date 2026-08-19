// import Contact from "../models/Contact.js";

// // @desc    Submit a contact message
// // @route   POST /api/contact
// // @access  Public
// export const submitContactMessage = async(req,res,next)=>{
//     try {
//         const message = await Contact.create(req.body);
//         res.status(201).json({
//             success:true,
//             message:'Your Message has been sent successfully',
//             data:message,
//         });
//     } catch (error) {
//         next(error);
//     }
// }

// // @desc    Get all messages (for review)
// // @route   GET /api/contact
// // @access  Public (or Protected later)
// export const getContactMessages = async(req,res,next)=>{
//     try {
//         const messages = await Contact.find().sort({createdAt:-1});
//          res.status(200).json({success:true,count:messages.length,data:messages});
//     } catch (error) {
//         next(error);
//     }
    
// }


import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

 console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'LOADED' : 'MISSING');





// @desc    Submit a contact message & send email notification
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Configure the Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    // 2. Configure Email Content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends the email to YOUR inbox
      replyTo: email, // Clicking "Reply" in Gmail replies to the sender
      subject: `[Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Inquiry Received via Portfolio
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
          </div>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};