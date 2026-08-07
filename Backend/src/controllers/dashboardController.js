const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");



// ===============================
// Dashboard Stats
// ===============================

const getDashboardStats = async (req, res) => {

  try {


    const userId = req.user._id;



    let stats = {};



    // ===============================
    // ADMIN DASHBOARD
    // ===============================

    if(req.user.role === "Admin"){



      const totalUsers =
        await User.countDocuments({
          status:"Active"
        });



      const totalProjects =
        await Project.countDocuments();



      const totalTasks =
        await Task.countDocuments();



      const todoTasks =
        await Task.countDocuments({
          status:"Todo"
        });



      const inProgressTasks =
        await Task.countDocuments({
          status:"In Progress"
        });



      const completedTasks =
        await Task.countDocuments({
          status:"Completed"
        });




      stats = {

        totalUsers,

        totalProjects,

        totalTasks,

        todoTasks,

        inProgressTasks,

        completedTasks,

      };



    }



    // ===============================
    // EMPLOYEE DASHBOARD
    // ===============================

    else {



      const myTasks =
        await Task.countDocuments({

          assignedTo:userId

        });



      const todoTasks =
        await Task.countDocuments({

          assignedTo:userId,

          status:"Todo"

        });



      const inProgressTasks =
        await Task.countDocuments({

          assignedTo:userId,

          status:"In Progress"

        });



      const completedTasks =
        await Task.countDocuments({

          assignedTo:userId,

          status:"Completed"

        });





      stats = {


        myTasks,

        todoTasks,

        inProgressTasks,

        completedTasks,


      };



    }






    res.status(200).json({

      success:true,

      stats

    });





  } catch(error){



    res.status(500).json({

      success:false,

      message:error.message

    });



  }


};





module.exports = {

  getDashboardStats

};