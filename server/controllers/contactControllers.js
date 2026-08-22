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


import { Resend } from 'resend';
import Contact from '../models/Contact.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // 1. Persist contact inquiry in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // 2. Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.EMAIL_TO || 'ayushyadav260704@gmail.com';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not defined. Message saved to database only.');
      return res.status(201).json({
        success: true,
        message: 'Message received and recorded successfully!',
        data: newContact,
      });
    }

    const resend = new Resend(resendApiKey);

    // 3. Send email over HTTPS (bypasses Render SMTP port blocking)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      reply_to: email,
      subject: `[Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px;">
            New Inquiry Received via Portfolio
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5; margin-top: 16px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap; margin-top: 8px; color: #1e293b;">${message}</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newContact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    next(error);
  }
};