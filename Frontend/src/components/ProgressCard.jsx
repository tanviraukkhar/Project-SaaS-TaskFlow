function ProgressCard({ project }) {


  // Temporary progress calculation

  let progress = 0;


  if (project.status === "Completed") {

    progress = 100;

  } 
  
  else if (project.status === "In Progress") {

    progress = 50;

  } 
  
  else {

    progress = 20;

  }





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
          -bottom-10
          -right-10

          w-36
          h-36

          bg-indigo-500/10

          rounded-full

          blur-3xl

        "

      />







      {/* Header */}


      <div

        className="
          relative

          flex
          justify-between
          items-center

          mb-6

        "

      >


        <h3

          className="
            text-lg
            font-bold

            text-gray-900
            dark:text-white

            truncate

            max-w-[70%]

          "

        >

          {project.title}

        </h3>





        <span

          className="
            text-indigo-600
            dark:text-indigo-400

            font-bold

          "

        >

          {progress}%

        </span>



      </div>









      {/* Progress Bar */}


      <div

        className="
          w-full

          h-3

          rounded-full

          bg-gray-200

          dark:bg-white/10

          overflow-hidden

        "

      >


        <div

          className="
            h-full

            rounded-full

            bg-gradient-to-r

            from-indigo-500

            to-purple-500

            transition-all

            duration-700

          "

          style={{

            width: `${progress}%`

          }}

        />



      </div>









      {/* Footer */}


      <div

        className="
          mt-5

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

          {project.status}

        </span>





        <span

          className="
            text-gray-500

            dark:text-gray-400

          "

        >

          👥 {project.members?.length || 0} Members

        </span>



      </div>






    </div>

  );

}


export default ProgressCard;