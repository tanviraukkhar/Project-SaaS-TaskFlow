import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
    ">


      {/* Mobile Overlay */}

      {
        sidebarOpen && (

          <div

            onClick={() => setSidebarOpen(false)}

            className="
              fixed
              inset-0
              bg-black/40
              z-40
              lg:hidden
            "

          />

        )
      }






      {/* Sidebar */}

      <div

        className={`

          fixed
          lg:sticky
          top-0
          left-0

          h-screen

          z-50

          transition-transform
          duration-300


          ${
            sidebarOpen

            ?

            "translate-x-0"

            :

            "-translate-x-full lg:translate-x-0"

          }

        `}

      >

        <Sidebar
          onClose={() =>
            setSidebarOpen(false)
          }
        />


      </div>









      {/* Main Area */}

      <div className="
        flex-1
        flex
        flex-col
        min-w-0
      ">


        <Topbar

          onMenuClick={() =>
            setSidebarOpen(true)
          }

        />



        <main

          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-y-auto
          "

        >

          {children}

        </main>



      </div>




    </div>

  );

}


export default DashboardLayout;