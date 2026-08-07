function RecentTaskCard({ task }) {


  return (

    <div

      className="
        group
        relative
        overflow-hidden

        bg-white/70
        dark:bg-slate-900/70

        backdrop-blur-xl

        border
        border-gray-200
        dark:border-white/10

        rounded-3xl

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl

      "

    >




      {/* Glow */}

      <div

        className="
          absolute
          -top-10
          -right-10

          w-32
          h-32

          bg-blue-500/10

          rounded-full

          blur-3xl

        "

      />








      {/* Header */}

      <div className="relative flex justify-between items-start gap-4">


        <div className="flex-1">


          <h3

            className="
              text-lg
              font-bold

              text-gray-900
              dark:text-white

              line-clamp-1

            "

          >

            {task.title}

          </h3>




          <p

            className="
              text-sm

              text-gray-500
              dark:text-gray-400

              mt-2

            "

          >

            {task.project?.title || "No Project"}

          </p>


        </div>







        {/* Status Badge */}

        <span

          className={`

            px-3
            py-1

            rounded-full

            text-xs

            font-semibold

            whitespace-nowrap


            ${
              task.status === "Completed"

              ?

              "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"


              :

              task.status === "In Progress"

              ?

              "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"


              :

              "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"

            }

          `}

        >

          {task.status}

        </span>


      </div>









      {/* Divider */}

      <div

        className="
          my-6

          border-t

          border-gray-200
          dark:border-white/10

        "

      />








      {/* Details */}

      <div

        className="
          grid
          grid-cols-2
          gap-5

        "

      >




        {/* Priority */}

        <div>


          <p

            className="
              text-sm

              text-gray-500
              dark:text-gray-400

            "

          >

            Priority

          </p>



          <p

            className={`

              mt-1

              font-bold


              ${
                task.priority === "High"

                ?

                "text-red-600 dark:text-red-400"


                :

                task.priority === "Medium"

                ?

                "text-orange-600 dark:text-orange-400"


                :

                "text-green-600 dark:text-green-400"

              }

            `}

          >

            {task.priority || "Low"}

          </p>



        </div>







        {/* Created Date */}

        <div>


          <p

            className="
              text-sm

              text-gray-500
              dark:text-gray-400

            "

          >

            Created

          </p>




          <p

            className="
              mt-1

              font-semibold

              text-gray-700
              dark:text-gray-200

            "

          >

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





      </div>





    </div>

  );

}


export default RecentTaskCard;