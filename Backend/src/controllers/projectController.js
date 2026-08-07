const Project = require("../models/Project");
const createNotification = require("../utils/createNotification");


// ===============================
// Create Project
// ===============================
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      progress,
      deadline,
      members,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("MEMBERS:", members);

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    const project = await Project.create({
      title,
      description,
      status,
      priority,
      progress: progress || 0,
      deadline,
      members: members || [],
      owner: req.user._id,
    });

    // Send notification to every selected member
    if (members && members.length > 0) {
      for (const userId of members) {
        const notification = await createNotification({
          user: userId,
          title: "Added to Project",
          message: `You have been added to the project "${title}".`,
          type: "project",
          project: project._id,
        });

        console.log("Notification Created:", notification);
      }
    }

    const populatedProject = await Project.findById(project._id)
      .populate("owner", "name email role")
      .populate("members", "name email role");

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: populatedProject,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








// ===============================
// Get All Projects
// Owner OR Member
// ===============================
const getProjects = async(req,res)=>{


  try{


    const projects =
      await Project.find({

        $or:[

          {
            owner:req.user._id
          },

          {
            members:req.user._id
          }

        ]

      })

      .populate("owner","name email role")

      .populate("members","name email role");





    res.status(200).json({

      success:true,

      count:projects.length,

      projects,

    });




  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};









// ===============================
// Get Single Project
// Owner OR Member
// ===============================
const getProjectById = async(req,res)=>{


  try{


    const project =
      await Project.findOne({

        _id:req.params.id,

        $or:[

          {
            owner:req.user._id
          },

          {
            members:req.user._id
          }

        ]

      })


      .populate("owner","name email role")

      .populate("members","name email role");





    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found.",

      });


    }





    res.status(200).json({

      success:true,

      project,

    });





  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};









// ===============================
// Update Project
// Only Owner
// ===============================
const updateProject = async(req,res)=>{


  try{


    const project =
      await Project.findOneAndUpdate(

        {

          _id:req.params.id,

          owner:req.user._id,

        },

        req.body,

        {

          new:true,

          runValidators:true,

        }

      )

      .populate("owner","name email role")

      .populate("members","name email role");







    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found or unauthorized.",

      });


    }





    res.status(200).json({

      success:true,

      message:"Project updated successfully.",

      project,

    });




  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};









// ===============================
// Delete Project
// Only Owner
// ===============================
const deleteProject = async(req,res)=>{


  try{


    const project =
      await Project.findOneAndDelete({

        _id:req.params.id,

        owner:req.user._id,

      });






    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found or unauthorized.",

      });


    }





    res.status(200).json({

      success:true,

      message:"Project deleted successfully.",

    });





  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};











// ===============================
// Get Project Members
// Owner OR Member
// ===============================
const getProjectMembers = async(req,res)=>{


  try{


    const project =
      await Project.findOne({

        _id:req.params.id,

        $or:[

          {
            owner:req.user._id
          },

          {
            members:req.user._id
          }

        ]

      })


      .populate("members","name email role");







    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found.",

      });


    }





    res.status(200).json({

      success:true,

      members:project.members,

    });




  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};












// ===============================
// Add Project Member
// Only Owner
// ===============================
const addProjectMember = async(req,res)=>{


  try{


    const {userId}=req.body;




    const project =
      await Project.findOne({

        _id:req.params.id,

        owner:req.user._id,

      });






    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found or unauthorized.",

      });


    }






    if(project.members.includes(userId)){


      return res.status(400).json({

        success:false,

        message:"User already added.",

      });


    }






    project.members.push(userId);



    await project.save();



const notification = await createNotification({
  user: userId,
  title: "Added to Project",
  message: `You have been added to the project "${project.title}".`,
  type: "project",
  project: project._id,
});

console.log("Notification Created:", notification);






    const updatedProject =
      await Project.findById(project._id)

      .populate("owner","name email role")

      .populate("members","name email role");







    res.status(200).json({

      success:true,

      message:"Member added successfully.",

      project:updatedProject,

    });






  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};











// ===============================
// Remove Project Member
// Only Owner
// ===============================
const removeProjectMember = async(req,res)=>{


  try{


    const {userId}=req.params;




    const project =
      await Project.findOne({

        _id:req.params.id,

        owner:req.user._id,

      });






    if(!project){


      return res.status(404).json({

        success:false,

        message:"Project not found.",

      });


    }







    project.members =
      project.members.filter(

        member =>
        member.toString() !== userId

      );






    await project.save();







    res.status(200).json({

      success:true,

      message:"Member removed successfully.",

    });






  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};










module.exports = {


  createProject,

  getProjects,

  getProjectById,

  updateProject,

  deleteProject,

  getProjectMembers,

  addProjectMember,

  removeProjectMember,


};