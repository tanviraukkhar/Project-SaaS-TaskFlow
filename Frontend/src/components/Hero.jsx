import { Link } from "react-router-dom";

function Hero() {
  return (

    <section className="py-20">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        grid
        md:grid-cols-2
        gap-12
        items-center
      ">


        {/* Left Content */}

        <div className="text-gray-900 dark:text-white">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">

            Manage Your Projects

            <span className="text-indigo-600 dark:text-indigo-400">

              {" "}Smarter

            </span>

          </h1>


          <p className="
            mt-6
            text-lg
            text-gray-600
            dark:text-gray-300
            max-w-xl
          ">

            Plan tasks, collaborate with your team, and track project progress
            from one powerful workspace.

          </p>



          {/* Demo Credentials Box */}

          <div className="mt-8">


            <div
              className="
              bg-white
              dark:bg-slate-800
              border
              border-gray-200
              dark:border-slate-700
              rounded-2xl
              p-6
              shadow-xl
              max-w-md
              "
            >


              <h3 className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
                mb-5
              ">

                Demo Login Credentials

              </h3>




              {/* Admin Account */}

              <div className="mb-6">


                <h4 className="
                  font-semibold
                  text-indigo-600
                  dark:text-indigo-400
                ">

                  Admin Account

                </h4>


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  mt-2
                ">

                  Gmail: tanvir@gmail.com

                </p>


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                ">

                  Password: Tanvir123

                </p>


              </div>





              {/* User Account */}

              <div className="mb-6">


                <h4 className="
                  font-semibold
                  text-green-600
                  dark:text-green-400
                ">

                  User Account

                </h4>


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  mt-2
                ">

                  Gmail: tivish@gmail.com

                </p>


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                ">

                  Password: Tivish1234

                </p>


              </div>





              {/* Register */}

              <div
                className="
                pt-5
                border-t
                border-gray-200
                dark:border-slate-700
                "
              >


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                ">

                  New user?

                </p>



                <Link
                  to="/register"
                  className="
                  inline-block
                  mt-3
                  px-6
                  py-3
                  bg-indigo-600
                  text-white
                  rounded-xl
                  hover:bg-indigo-700
                  transition
                  shadow-md
                  "
                >

                  Create Account

                </Link>



                <p className="
                  text-xs
                  text-gray-500
                  mt-3
                ">

                  Registration is available for User accounts only.

                </p>


              </div>


            </div>


          </div>


        </div>







        {/* Dashboard Preview */}


        <div
          className="
          bg-white
          dark:bg-white/10
          backdrop-blur-lg
          border
          border-gray-200
          dark:border-white/20
          rounded-2xl
          p-6
          shadow-xl
          transition-colors
          duration-300
          "
        >


          <div
            className="
            bg-white
            dark:bg-slate-800
            rounded-xl
            p-5
            text-gray-800
            dark:text-white
            "
          >


            <h3 className="font-bold text-xl">

              Project Dashboard

            </h3>



            <div className="mt-5 space-y-3">


              <div
                className="
                p-3
                bg-indigo-100
                dark:bg-indigo-900/40
                dark:text-indigo-100
                rounded-lg
                "
              >

                Project & Task Management

              </div>




              <div
                className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                dark:text-green-100
                rounded-lg
                "
              >

                Team Collaboration & Assignments

              </div>





              <div
                className="
                p-3
                bg-yellow-100
                dark:bg-yellow-900/40
                dark:text-yellow-100
                rounded-lg
                "
              >

                Progress Tracking & Analytics

              </div>



            </div>



          </div>



        </div>



      </div>


    </section>

  );
}

export default Hero;