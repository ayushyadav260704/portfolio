import Contact from "../models/Contact.js";

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async(req,res,next)=>{
    try {
        const message = await Contact.create(req.body);
        res.status(201).json({
            success:true,
            message:'Your Message has been sent successfully',
            data:message,
        });
    } catch (error) {
        next(error);
    }
}

// @desc    Get all messages (for review)
// @route   GET /api/contact
// @access  Public (or Protected later)
export const getContactMessages = async(req,res,next)=>{
    try {
        const messages = await Contact.find().sort({createdAt:-1});
         res.status(200).json({success:true,count:messages.length,data:messages});
    } catch (error) {
        next(error);
    }
    
}