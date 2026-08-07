function RecentProjectCard({ project }) {


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



      {/* Glow Effect */}

      <div

        className="
          absolute
          -top-10
          -right-10

          w-32
          h-32

          bg-indigo-500/10

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

            {project.title}

          </h3>



          <p

            className="
              text-sm

              text-gray-500
              dark:text-gray-400

              mt-2

              line-clamp-2

            "

          >

            {project.description || "No description available"}

          </p>


        </div>






        {/* Status */}

        <span

          className={`

            px-3
            py-1

            rounded-full

            text-xs

            font-semibold

            whitespace-nowrap


            ${
              project.status === "Completed"

              ?

              "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"


              :

              project.status === "In Progress"

              ?

              "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"


              :

              "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"

            }

          `}

        >

          {project.status}

        </span>


      </div>








      {/* Priority */}


      <div

        className="
          mt-6

          flex
          justify-between
          items-center

          text-sm

        "

      >

        <span

          className="
            text-gray-500
            dark:text-gray-400
          "

        >

          Priority

        </span>



        <span

          className="
            font-semibold

            text-indigo-600
            dark:text-indigo-400

          "

        >

          {project.priority || "Medium"}

        </span>



      </div>








      {/* Divider */}

      <div

        className="
          my-5

          border-t

          border-gray-200
          dark:border-white/10

        "

      />







      {/* Footer */}

      <div

        className="
          flex
          justify-between
          items-center

          text-sm

        "

      >



        <span

          className="
            text-gray-500
            dark:text-gray-400

          "

        >

          👥 {project.members?.length || 0} Members

        </span>





        <span

          className="
            text-gray-500
            dark:text-gray-400

          "

        >

          👤 {project.owner?.name || "Owner"}

        </span>




      </div>





    </div>

  );

}


export default RecentProjectCard;