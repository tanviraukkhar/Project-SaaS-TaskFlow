const Task = require("../models/Task");
const createNotification = require("../utils/createNotification");



// ===============================
// Create Task
// ===============================
const createTask = async (req,res)=>{

  try{


    if(req.user.role !== "Admin"){

      return res.status(403).json({

        success:false,

        message:"Only Admin can create tasks.",

      });

    }



    const {

      title,

      description,

      status,

      priority,

      dueDate,

      project,

      assignedTo,

    } = req.body;





    if(!title || !project){

      return res.status(400).json({

        success:false,

        message:"Title and Project are required.",

      });

    }





    const task = await Task.create({

      title,

      description,

      status,

      priority,

      dueDate,

      project,


      // Multiple Users

      assignedTo: assignedTo || [],



      createdBy:req.user._id,



      activities:[

        {

          user:req.user._id,

          action:"Task created",

          date:new Date(),

        }

      ]

    });

// Create notification for assigned users
if (assignedTo && assignedTo.length > 0) {
  for (const userId of assignedTo) {
    await createNotification({
      user: userId,
      title: "New Task Assigned",
      message: `You have been assigned a new task: ${title}`,
      type: "task",
      project: project,
      task: task._id,
    });
  }
}





    const populatedTask = await Task.findById(task._id)

    .populate("project","title")

    .populate("assignedTo","name email")

    .populate("createdBy","name email")

    .populate("activities.user","name email");





    res.status(201).json({

      success:true,

      message:"Task created successfully.",

      task:populatedTask,

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};




// ===============================
// Get All Tasks
// ===============================
const getTasks = async(req,res)=>{


try{


let tasks;



if(req.user.role==="Admin"){


tasks = await Task.find({

createdBy:req.user._id

});



}else{


tasks = await Task.find({

assignedTo:req.user._id

});


}





tasks = await Task.populate(tasks,[


{

path:"project",

select:"title"

},


{

path:"assignedTo",

select:"name email"

},


{

path:"createdBy",

select:"name email"

},


{

path:"activities.user",

select:"name email"

}


]);





res.status(200).json({

success:true,

count:tasks.length,

tasks,

});



}catch(error){


res.status(500).json({

success:false,

message:error.message,

});


}


};

// ===============================
// Get Single Task
// ===============================
const getTaskById = async(req,res)=>{


try{


let task;



if(req.user.role==="Admin"){


task = await Task.findOne({

_id:req.params.id,

createdBy:req.user._id,

});


}else{


task = await Task.findOne({

_id:req.params.id,

assignedTo:req.user._id,

});


}





if(!task){


return res.status(404).json({

success:false,

message:"Task not found.",

});


}





await task.populate([


{

path:"project",

select:"title"

},


{

path:"assignedTo",

select:"name email"

},


{

path:"createdBy",

select:"name email"

},


{

path:"activities.user",

select:"name email"

}


]);





res.status(200).json({

success:true,

task,

});




}catch(error){


res.status(500).json({

success:false,

message:error.message,

});


}


};









// ===============================
// Update Task
// ===============================
const updateTask = async(req,res)=>{


try{


let task;



if(req.user.role==="Admin"){


task = await Task.findOne({

_id:req.params.id,

createdBy:req.user._id,

});


}else{


task = await Task.findOne({

_id:req.params.id,

assignedTo:req.user._id,

});


}





if(!task){


return res.status(404).json({

success:false,

message:"Task not found.",

});


}




// Keep track of the status BEFORE any change, to detect a transition
const previousStatus = task.status;







// Employee only status update

if(req.user.role !== "Admin"){



task.status =

req.body.status || task.status;



task.activities.push({

user:req.user._id,

action:`Status changed to ${task.status}`,

date:new Date(),

});



}







// Admin full update

else{



task.title =

req.body.title ?? task.title;



task.description =

req.body.description ?? task.description;



task.status =

req.body.status ?? task.status;



task.priority =

req.body.priority ?? task.priority;



task.dueDate =

req.body.dueDate ?? task.dueDate;



task.project =

req.body.project ?? task.project;





// Multiple users assign

if(req.body.assignedTo){


task.assignedTo = req.body.assignedTo;


}




task.activities.push({

user:req.user._id,

action:"Task updated by Admin",

date:new Date(),

});



}




// Notify task creator when status newly becomes "Completed"
if (

previousStatus !== "Completed" &&

task.status === "Completed"

) {

await createNotification({
  user: task.createdBy,
  title: "Task Completed",
  message: `${req.user.name} has completed the task "${task.title}".`,
  type: "task",
  project: task.project,
  task: task._id,
});

}






await task.save();







const updatedTask = await Task.findById(task._id)


.populate("project","title")

.populate("assignedTo","name email")

.populate("createdBy","name email")

.populate("activities.user","name email");







res.status(200).json({


success:true,


message:"Task updated successfully.",


task:updatedTask,


});




}catch(error){


res.status(500).json({

success:false,

message:error.message,

});


}


};
// ===============================
// Employee Start / Complete Task
// ===============================
const updateTaskStatus = async(req,res)=>{


try{


const { status } = req.body;



const task = await Task.findOne({


_id:req.params.id,


assignedTo:req.user._id,


});






if(!task){


return res.status(404).json({


success:false,


message:"Task not assigned to you.",


});


}






task.status = status;





task.activities.push({


user:req.user._id,


action:`Status changed to ${status}`,


date:new Date(),


});



if (status === "Completed") {
  await createNotification({
    user: task.createdBy,
    title: "Task Completed",
    message: `${req.user.name} has completed the task "${task.title}".`,
    type: "task",
    project: task.project,
    task: task._id,
  });
}




await task.save();







const updatedTask = await Task.findById(task._id)


.populate("project","title")

.populate("assignedTo","name email")

.populate("createdBy","name email")

.populate("activities.user","name email");







res.status(200).json({


success:true,


message:"Task status updated successfully.",


task:updatedTask,


});





}catch(error){


res.status(500).json({


success:false,


message:error.message,


});


}


};











// ===============================
// Delete Task
// ===============================
const deleteTask = async(req,res)=>{


try{


if(req.user.role !== "Admin"){


return res.status(403).json({


success:false,


message:"Only Admin can delete tasks.",


});


}







const task = await Task.findOneAndDelete({


_id:req.params.id,


createdBy:req.user._id,


});







if(!task){


return res.status(404).json({


success:false,


message:"Task not found.",


});


}








res.status(200).json({


success:true,


message:"Task deleted successfully.",


});






}catch(error){



res.status(500).json({


success:false,


message:error.message,


});



}


};











// ===============================
// Export Controllers
// ===============================

module.exports = {


createTask,


getTasks,


getTaskById,


updateTask,


updateTaskStatus,


deleteTask,


};