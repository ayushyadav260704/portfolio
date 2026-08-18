import Project from "../models/Project.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async(req,res,next)=>{
     try {
        const projects = await Project.find().sort({createdAt:-1});
        res.status(200).json({ success: true, count: projects.length, data: projects });
        
     } catch (error) {
        next(error);
     }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (or Protected later)
export const createProject = async(req,res,next)=>{
    try {
        //console.log("Request body:", req.body); //checking

        const project = await Project.create(req.body);
        res.status(201).json({success:true,data:project}); //201 means created successfully
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (or Protected later)
export const deleteProject = async(req,res,next)=>{
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res.status(404).json({success:false,message:'Project not found'});
        }    //HTTP status code 404 means not Found
        res.status(200).json({success:true,data:{}});  // 200 means ok
    } catch (error) {
        next(error);
    }
};