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

// @desc    Submit a contact message & send email notification
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation check
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    // 2. Save inquiry to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // 3. Check environment variables
    const user = process.env.EMAIL_USER;
    const rawPass = process.env.EMAIL_PASS;

    if (!user || !rawPass) {
      console.error('ERROR: EMAIL_USER or EMAIL_PASS environment variable is missing on Render.');
      return res.status(500).json({
        success: false,
        message: 'Mail server configuration is missing.',
      });
    }

    // Sanitize 16-character Google App Password (remove spaces)
    const pass = rawPass.replace(/\s+/g, '');

    // 4. Configure explicit SSL transporter on port 465
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user,
        pass,
      },
    });

    // 5. Configure Email Payload
    const mailOptions = {
      from: `"Portfolio Contact" <${user}>`,
      to: process.env.EMAIL_TO || user,
      replyTo: email,
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

    // 6. Send Mail
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newContact,
    });
  } catch (error) {
    console.error('Nodemailer / Contact submission error:', error);
    next(error);
  }
};