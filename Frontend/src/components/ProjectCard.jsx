import {
  Pencil,
  Trash2,
  Users,
  CalendarDays,
} from "lucide-react";


function ProjectCard({ project, onEdit, onDelete }) {


  const statusStyle = {

    Completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",

    "In Progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",

    Planning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",

  };




  const priorityStyle = {

    High:
      "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400",

    Medium:
      "text-orange-600 bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400",

    Low:
      "text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400",

  };




  return (

    <div
      className="
      group
      bg-white
      dark:bg-slate-900
      rounded-3xl
      p-6
      border
      border-gray-100
      dark:border-slate-800
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >



      {/* Header */}

      <div className="flex justify-between gap-4">


        <div className="flex-1">


          <h2
            className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
            "
          >

            {project.title}

          </h2>



          <p
            className="
            text-gray-500
            dark:text-gray-400
            mt-2
            text-sm
            line-clamp-2
            "
          >

            {project.description || "No description available"}

          </p>


        </div>





        {/* Action */}

        <div className="flex gap-2">


          <button

            onClick={onEdit}

            className="
            w-9
            h-9
            rounded-xl
            bg-yellow-100
            text-yellow-700
            hover:bg-yellow-200
            flex
            items-center
            justify-center
            "
          >

            <Pencil size={17}/>

          </button>





          <button

            onClick={onDelete}

            className="
            w-9
            h-9
            rounded-xl
            bg-red-100
            text-red-700
            hover:bg-red-200
            flex
            items-center
            justify-center
            "
          >

            <Trash2 size={17}/>

          </button>


        </div>



      </div>









      {/* Badges */}

      <div className="flex gap-3 mt-5">


        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          ${
            statusStyle[project.status]
            ||
            statusStyle.Planning
          }
          `}
        >

          {project.status}

        </span>




        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          ${
            priorityStyle[project.priority]
            ||
            priorityStyle.Medium
          }
          `}
        >

          {project.priority || "Medium"}

        </span>


      </div>









      {/* Progress */}

      <div className="mt-6">


        <div className="flex justify-between mb-2">


          <span
            className="
            text-sm
            text-gray-500
            dark:text-gray-400
            "
          >

            Progress

          </span>



          <span
            className="
            font-semibold
            text-gray-800
            dark:text-white
            "
          >

            {project.progress || 0}%

          </span>


        </div>





        <div
          className="
          h-3
          bg-gray-200
          dark:bg-slate-700
          rounded-full
          overflow-hidden
          "
        >

          <div

            className="
            h-full
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            rounded-full
            transition-all
            "

            style={{
              width:`${project.progress || 0}%`
            }}

          />


        </div>



      </div>









      {/* Team Members */}

      <div className="mt-6">

        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-gray-700
          dark:text-gray-300
          mb-3
          "
        >

          <Users size={16}/>

          Team Members

        </div>


        <div className="flex flex-wrap gap-2">

          {
            project.members &&
            project.members.length > 0

            ?

            project.members.map((member)=>(

              <span
                key={member._id}
                className="
                px-3
                py-1
                rounded-full
                text-xs
                bg-indigo-100
                text-indigo-700
                dark:bg-indigo-500/20
                dark:text-indigo-400
                "
              >

                {member.name} ({member.role})

              </span>

            ))

            :

            <span className="text-sm text-gray-500">
              No members assigned
            </span>

          }

        </div>

      </div>









      {/* Footer Info */}


      <div
        className="
        mt-6
        pt-5
        border-t
        border-gray-100
        dark:border-slate-800
        flex
        justify-between
        text-sm
        "
      >


        <span
          className="
          flex
          items-center
          gap-2
          text-gray-500
          dark:text-gray-400
          "
        >

          <Users size={16}/>

          {project.members?.length || 0}

        </span>





        <span
          className="
          flex
          items-center
          gap-2
          text-gray-500
          dark:text-gray-400
          "
        >

          <CalendarDays size={16}/>


          {
            project.deadline

            ?

            new Date(project.deadline)
            .toLocaleDateString()

            :

            "No Deadline"
          }


        </span>



      </div>



    </div>

  );
}


export default ProjectCard;
