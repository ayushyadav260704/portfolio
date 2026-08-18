import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
   title : {
        type:String,
        required:[true,'Please add a project title'],
        trim:true,
        maxLength:[100,'Tiitle must not exceed 100 characters'],
    },
   description : {
          type:String,
          required:[true,'Please add a description']
    },
    techStack : {
        type:[String],
        required:[true,'Please add atleast one techStack item']
    },
    imageUrl : {
        type:String,
        default:"",
    },
    getHubUrl:{
        type:String,
        trim:true,
    },
    liveUrl:{
        type:String,
        trim:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
},{
    timestamps:true, // Automatically manages createdAt and updatedAt fields
});

const Project = mongoose.model("Project", projectSchema);

export default Project;