function TaskCard({ 
  task, 
  onEdit, 
  onDelete,
  onStatusUpdate,
  onHistory
}) {

  const today = new Date();

const dueDate = task.dueDate
  ? new Date(task.dueDate)
  : null;

const isOverdue =
  dueDate &&
  dueDate < today &&
  task.status !== "Completed";

const isToday =
  dueDate &&
  dueDate.toDateString() === today.toDateString();


  return (

    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">


      <div className="flex justify-between items-start">


        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {task.title}
          </h2>


          <p className="text-gray-500 mt-1">
            {task.project?.title || "No Project"}
          </p>


        </div>




        <span
          className={`
            px-3 py-1 rounded-full text-sm font-medium

            ${
              task.status === "Completed"
              ? "bg-green-100 text-green-700"

              : task.status === "In Progress"
              ? "bg-blue-100 text-blue-700"

              : "bg-yellow-100 text-yellow-700"
            }

          `}
        >

          {task.status}

        </span>


      </div>








      <div className="mt-5">


        <p className="text-gray-500 text-sm">
          Description
        </p>


        <p className="text-gray-700 mt-1">

          {task.description || "No description"}

        </p>


      </div>









      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">



        <div>

          <p className="text-gray-500">
            Priority
          </p>


          <p className="font-semibold text-indigo-600">

            {task.priority}

          </p>


        </div>







        <div>

          <p className="text-gray-500">
            Assigned To
          </p>



          <div className="font-semibold text-gray-700">


            {

              task.assignedTo &&
              task.assignedTo.length > 0

              ?


              task.assignedTo.map((user,index)=>(

                <p key={user._id || index}>

                  {user.name}

                </p>


              ))


              :

              "Not Assigned"


            }



          </div>


        </div>



      </div>









      <div className="mt-5">


        <p className="text-gray-500 text-sm">
          Created
        </p>


        <p className="font-semibold">

          {
            task.createdAt
            ?
            new Date(task.createdAt)
            .toLocaleDateString()

            :

            "N/A"
          }


        </p>


      </div>

<div className="mt-5">

  <p className="text-gray-500 text-sm">
    Due Date
  </p>

  <p className="font-semibold">

    {
      task.dueDate
      ?
      new Date(task.dueDate).toLocaleDateString()

      :

      "No Due Date"
    }

  </p>

</div>








      {/* Employee Status Button */}


      {
        task.status !== "Completed" && (


          <div className="mt-6 flex gap-3">


            {
              task.status === "Todo" && (


                <button

                  onClick={()=>onStatusUpdate(
                    task._id,
                    "In Progress"
                  )}

                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"

                >

                  Start Task

                </button>


              )

            }





            {
              task.status === "In Progress" && (


                <button

                  onClick={()=>onStatusUpdate(
                    task._id,
                    "Completed"
                  )}

                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"

                >

                  Complete Task

                </button>


              )

            }



          </div>


        )

      }









      {
        onHistory && (


          <button

            onClick={onHistory}

            className="w-full mt-6 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 rounded-lg font-medium"

          >

            View History

          </button>


        )

      }









      <div className="flex gap-3 mt-4">


        {
          onEdit && (


            <button

              onClick={onEdit}

              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"

            >

              Edit

            </button>


          )

        }





        {
          onDelete && (


            <button

              onClick={onDelete}

              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"

            >

              Delete

            </button>


          )

        }



      </div>





    </div>


  );

}


export default TaskCard;