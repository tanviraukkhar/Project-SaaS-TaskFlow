import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  Settings,
  LogOut
} from "lucide-react";

import NotificationBell from "../components/NotificationBell";


function Topbar({ onMenuClick }) {


  const navigate = useNavigate();


  const [open, setOpen] = useState(false);


  const dropdownRef = useRef(null);



  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Tanvir",
      role: "Admin",
    };





  useEffect(() => {


    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );


  }, []);







  const handleLogout = () => {


    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );


    if (!confirmLogout) return;



    localStorage.removeItem("token");
    localStorage.removeItem("user");


    navigate("/");


  };






  return (


    <header className="
      h-20
      bg-white
      dark:bg-slate-900
      border-b
      border-gray-200
      dark:border-slate-700
      flex
      items-center
      justify-between
      px-4
      sm:px-6
      lg:px-8
    ">





      {/* Left Side */}


      <div className="flex items-center gap-3">


        <button

          onClick={onMenuClick}

          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-slate-800
          "

        >

          <Menu
            size={24}
            className="text-gray-700 dark:text-white"
          />

        </button>





        <div>


          <h2 className="
            text-xl
            sm:text-2xl
            font-bold
            text-gray-900
            dark:text-white
          ">

            Dashboard

          </h2>



          <p className="
            hidden
            sm:block
            text-gray-500
            dark:text-gray-400
            text-sm
          ">

            Welcome back, manage your projects here.

          </p>


        </div>


      </div>









      {/* Right Side */}


      <div className="flex items-center gap-3">



    <NotificationBell />








        <div
          className="relative"
          ref={dropdownRef}
        >


          <button

            onClick={() => setOpen(!open)}

            className="
              flex
              items-center
              gap-3
            "

          >


            <div className="
              w-10
              h-10
              rounded-full
              bg-indigo-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            ">


              {user.name?.charAt(0).toUpperCase()}


            </div>





            <div className="
              hidden
              md:block
              text-left
            ">


              <p className="
                font-semibold
                text-gray-900
                dark:text-white
              ">

                {user.name}

              </p>



              <p className="
                text-sm
                text-gray-500
                dark:text-gray-400
              ">

                {user.role}

              </p>


            </div>


          </button>









          {
            open && (


              <div className="
                absolute
                right-0
                mt-3
                w-56
                bg-white
                dark:bg-slate-900
                rounded-xl
                shadow-xl
                border
                border-gray-200
                dark:border-slate-700
                overflow-hidden
                z-50
              ">




                <button

                  onClick={()=>{
                    navigate("/profile");
                    setOpen(false);
                  }}

                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-200
                    hover:bg-gray-100
                    dark:hover:bg-slate-800
                  "

                >

                  <User size={18}/>

                  My Profile


                </button>







                <button

                  onClick={()=>{
                    navigate("/settings");
                    setOpen(false);
                  }}

                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-200
                    hover:bg-gray-100
                    dark:hover:bg-slate-800
                  "

                >

                  <Settings size={18}/>

                  Settings


                </button>







                <hr className="
                  border-gray-200
                  dark:border-slate-700
                "/>






                <button

                  onClick={handleLogout}

                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                    dark:hover:bg-red-950
                  "

                >

                  <LogOut size={18}/>

                  Logout


                </button>



              </div>


            )
          }





        </div>


      </div>




    </header>


  );


}


export default Topbar;