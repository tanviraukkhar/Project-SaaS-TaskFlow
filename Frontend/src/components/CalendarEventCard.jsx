function CalendarEventCard({ event }) {

  const statusColor = {

    "Planning":
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",

    "To Do":
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    "In Progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

    "Completed":
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",

  };



  const priorityColor = {

    High:
      "text-red-600 dark:text-red-400",

    Medium:
      "text-orange-600 dark:text-orange-400",

    Low:
      "text-emerald-600 dark:text-emerald-400",

  };



  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
      "
    >


      {/* Header */}

      <div className="flex justify-between items-start gap-3">

        <div>

          <h3 className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
          ">

            {event.title}

          </h3>

          <p className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          ">

            📁 {event.project}

          </p>

        </div>


        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${statusColor[event.type] ||
            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
          `}
        >

          {event.type}

        </span>

      </div>





      {/* Details */}

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">

          <span className="
            text-slate-500
            dark:text-slate-400
          ">

            Due Date

          </span>

          <span className="
            font-semibold
            text-slate-800
            dark:text-slate-200
          ">

            {event.date
              ? new Date(event.date).toLocaleDateString()
              : "N/A"}

          </span>

        </div>



        <div className="flex justify-between">

          <span className="
            text-slate-500
            dark:text-slate-400
          ">

            Priority

          </span>

          <span
            className={`
              font-bold
              ${priorityColor[event.priority] || ""}
            `}
          >

            {event.priority || "Medium"}

          </span>

        </div>

      </div>





      {/* Bottom */}

      <div className="
        mt-6
        pt-4
        border-t
        border-slate-200
        dark:border-slate-700
        flex
        items-center
        justify-between
      ">

        <span className="
          text-xs
          text-slate-500
          dark:text-slate-400
        ">

          📅 Calendar Task

        </span>

        <span className="
          text-xs
          font-semibold
          text-slate-700
          dark:text-slate-300
        ">

          {event.type}

        </span>

      </div>

    </div>

  );

}

export default CalendarEventCard;