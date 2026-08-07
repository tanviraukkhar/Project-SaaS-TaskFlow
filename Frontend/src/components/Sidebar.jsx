import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  User,
  Settings,
  X
} from "lucide-react";


function Sidebar({ onClose }) {


  const location = useLocation();


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },

    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare
    },

    {
      name: "Calendar",
      path: "/calendar",
      icon: Calendar
    },

    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3
    },


    ...(user?.role === "Admin"

      ?
      [
        {
          name: "Users",
          path: "/users",
          icon: Users
        }
      ]

      :

      []

    ),


    {
      name: "Profile",
      path: "/profile",
      icon: User
    },


    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    },


  ];





  return (


    <aside className="
      w-72
      min-h-screen
      h-screen
      bg-slate-950
      text-white
      shadow-2xl
      flex
      flex-col
      p-6
    ">


      {/* Logo */}

      <div className="
        flex
        items-center
        justify-between
        mb-8
        flex-shrink-0
      ">


        <h1 className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-indigo-400
          to-purple-500
          bg-clip-text
          text-transparent
        ">

          TaskFlow

        </h1>



        <button

          onClick={onClose}

          className="
            lg:hidden
            text-gray-400
            hover:text-white
          "

        >

          <X size={24}/>

        </button>


      </div>





      {/* Navigation Scroll Area */}

      <nav className="
        space-y-2
        overflow-y-auto
        flex-1
        pr-2
        scrollbar-thin
      ">


        {
          menu.map((item)=>{


            const Icon = item.icon;


            const active =
              location.pathname === item.path;



            return (


              <Link

                key={item.path}

                to={item.path}

                onClick={onClose}


                className={`

                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-300


                  ${
                    active

                    ?

                    "bg-indigo-600 shadow-lg shadow-indigo-600/30"

                    :

                    "text-gray-300 hover:bg-white/10 hover:text-white"

                  }

                `}


              >


                <Icon size={20}/>


                <span className="font-medium">

                  {item.name}

                </span>


              </Link>


            );


          })
        }


      </nav>



    </aside>


  );

}


export default Sidebar;