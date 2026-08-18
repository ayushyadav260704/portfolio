import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
     name : {
        type : String,
        required:[true,'Please add your name'],
        trim:true
     },
     email : {
        type: String,
        required:[true,'Please add an email address'],
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
     },
     subject: {
      type: String,
      default: 'New Inquiry from Portfolio',
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
},{
    timestamps:true,
});

const Contact = mongoose.model("Contact",contactSchema);
export default Contact;