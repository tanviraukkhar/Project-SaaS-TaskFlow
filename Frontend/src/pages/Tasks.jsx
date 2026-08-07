import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import TaskHistoryModal from "../components/TaskHistoryModal";

import API from "../api/axios";



function Tasks() {


  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);



  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");




  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);




  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);




  // History

  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);



  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role?.toLowerCase() === "admin";






  // ===============================
  // Fetch Tasks
  // ===============================


  const fetchTasks = async()=>{


    try{


      setLoading(true);



      const res = await API.get("/tasks");



      setTasks(
        res.data.tasks || []
      );



    }catch(error){


      console.log(
        error.response?.data?.message
      );


    }finally{


      setLoading(false);


    }


  };





  useEffect(()=>{


    fetchTasks();


  },[]);





  // ===============================
  // Create / Update Task
  // ===============================

  const handleSaveTask = async(taskData)=>{


    try{


      if(editingTask){


        await API.put(

          `/tasks/${editingTask._id}`,

          taskData

        );



      }else{


        await API.post(

          "/tasks",

          taskData

        );


      }




      fetchTasks();



      setIsModalOpen(false);

      setEditingTask(null);



    }catch(error){


      console.log(

        error.response?.data?.message

      );


    }


  };








  // ===============================
  // Employee Update Status
  // ===============================

  const handleStatusUpdate = async(

    taskId,

    status

  )=>{


    try{


      await API.patch(

        `/tasks/${taskId}/status`,

        {
          status
        }

      );



      fetchTasks();



    }catch(error){


      console.log(

        error.response?.data?.message

      );


    }


  };








  // ===============================
  // Delete Task
  // ===============================

  const handleDeleteTask = async()=>{


    try{


      await API.delete(

        `/tasks/${deleteId}`

      );



      fetchTasks();



      setDeleteId(null);

      setIsDeleteOpen(false);



    }catch(error){


      console.log(

        error.response?.data?.message

      );


    }


  };







  // ===============================
  // Search + Filter
  // ===============================

  const filteredTasks = useMemo(()=>{


    return tasks.filter((task)=>{


      const projectName =

        task.project?.title || "";





      // Multiple Assigned Users

      const assignedUser =

        task.assignedTo

        ?.map(

          (user)=>user.name

        )

        .join(" ")

        ||

        "";





      const searchMatch =


        task.title

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )



        ||



        projectName

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )



        ||



        assignedUser

        .toLowerCase()

        .includes(

          search.toLowerCase()

        );





      const statusMatch =


        status === "All"

        ||

        task.status === status;





      return searchMatch && statusMatch;



    });



  },[

    tasks,

    search,

    status

  ]);

    return (


    <DashboardLayout>


      <div className="flex justify-between items-center mb-8">


        <div>


          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

            Tasks

          </h1>



          <p className="text-gray-500 dark:text-gray-400">

            Manage all tasks.

          </p>


        </div>





        {
          isAdmin &&

          <button


            onClick={()=>{


              setEditingTask(null);

              setIsModalOpen(true);



            }}


            className="
            bg-indigo-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-indigo-700
            "


          >

            + New Task


          </button>
        }



      </div>








      <div className="grid md:grid-cols-2 gap-4 mb-8">



        <input


          value={search}


          onChange={(e)=>setSearch(e.target.value)}


          placeholder="Search Task..."


          className="
          border
          border-gray-300
          dark:border-slate-600
          rounded-xl
          p-3
          bg-white
          dark:bg-slate-800
          text-gray-900
          dark:text-white
          placeholder-gray-400
          dark:placeholder-gray-400
          "


        />






        <select


          value={status}


          onChange={(e)=>setStatus(e.target.value)}


          className="
          border
          border-gray-300
          dark:border-slate-600
          rounded-xl
          p-3
          bg-white
          dark:bg-slate-800
          text-gray-900
          dark:text-white
          "


        >


          <option>
            All
          </option>


          <option>
            Todo
          </option>


          <option>
            In Progress
          </option>


          <option>
            Completed
          </option>


        </select>



      </div>








      {


        loading ?


        (

          <h2 className="text-center text-gray-500 dark:text-gray-400">

            Loading Tasks...

          </h2>


        )



        :



        (

          <div className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          ">



          {


            filteredTasks.length > 0 ?



            filteredTasks.map((task)=>(



              <TaskCard


                key={task._id}



                task={task}





                onStatusUpdate={

                  handleStatusUpdate

                }





                onHistory={()=>{


                  setSelectedTask(task);

                  setHistoryOpen(true);


                }}






                onEdit={()=>{


                  setEditingTask(task);

                  setIsModalOpen(true);


                }}






                onDelete={()=>{


                  setDeleteId(task._id);

                  setIsDeleteOpen(true);


                }}



              />



            ))





            :



            (

              <div className="
              col-span-full
              text-center
              py-12
              ">


                <h2 className="
                text-2xl
                font-bold
                text-gray-600
                dark:text-gray-400
                ">

                  No Task Found

                </h2>


              </div>


            )



          }



          </div>


        )


      }

      <CreateTaskModal


        isOpen={isModalOpen}



        onClose={()=>{


          setIsModalOpen(false);


          setEditingTask(null);



        }}




        onSave={handleSaveTask}



        task={editingTask}



      />









      <DeleteTaskModal


        isOpen={isDeleteOpen}



        onClose={()=>{


          setDeleteId(null);


          setIsDeleteOpen(false);



        }}



        onConfirm={handleDeleteTask}



      />









      <TaskHistoryModal


        isOpen={historyOpen}



        onClose={()=>{


          setHistoryOpen(false);


          setSelectedTask(null);



        }}



        activities={

          selectedTask?.activities

        }



      />





    </DashboardLayout>


  );



}



export default Tasks;