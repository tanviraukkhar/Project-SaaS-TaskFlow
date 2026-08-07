function StatCard({
  title,
  value,
  color = "indigo",
}) {


  const colorClasses = {

    indigo: {
      icon: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
      glow: "group-hover:shadow-indigo-500/20",
    },


    green: {
      icon: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      glow: "group-hover:shadow-emerald-500/20",
    },


    yellow: {
      icon: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      glow: "group-hover:shadow-yellow-500/20",
    },


    blue: {
      icon: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      glow: "group-hover:shadow-blue-500/20",
    },


    purple: {
      icon: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      glow: "group-hover:shadow-purple-500/20",
    },


  };




  return (

    <div

      className={`
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

        shadow-lg

        transition-all
        duration-300

        hover:-translate-y-2

        hover:shadow-2xl

        ${colorClasses[color]?.glow}

      `}

    >



      {/* Glass Gradient Effect */}

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







      {/* Icon */}

      <div

        className={`
          relative

          w-14
          h-14

          rounded-2xl

          flex
          items-center
          justify-center

          text-2xl
          font-bold

          ${colorClasses[color]?.icon}

        `}

      >

        {title.charAt(0)}

      </div>







      {/* Title */}

      <p

        className="
          mt-6

          text-sm
          font-medium

          text-gray-500
          dark:text-gray-400

        "

      >

        {title}

      </p>







      {/* Number */}

      <h2

        className="
          mt-2

          text-4xl

          font-bold

          text-gray-900
          dark:text-white

        "

      >

        {value}

      </h2>








      {/* Status */}

      <div

        className="
          mt-5

          flex
          items-center

          gap-2

          text-xs

          text-gray-400

        "

      >

        <span

          className="
            w-2
            h-2
            rounded-full
            bg-green-500
            animate-pulse
          "

        />

        Updated recently


      </div>





    </div>

  );

}


export default StatCard;