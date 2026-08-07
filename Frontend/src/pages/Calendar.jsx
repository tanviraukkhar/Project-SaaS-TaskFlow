import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CalendarEventCard from "../components/CalendarEventCard";

import API from "../api/axios";

function Calendar() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );



  // ===============================
  // Current Month
  // ===============================

  const currentMonth =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();



  const monthName =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    );



  const totalDays = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();



  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();




  // ===============================
  // Fetch Tasks
  // ===============================

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res =
        await API.get("/tasks");

      setTasks(
        res.data.tasks || []
      );

    } catch (error) {

      console.log(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchTasks();

  }, []);




  // ===============================
  // Previous Month
  // ===============================

  const previousMonth = () => {

    setCurrentDate(

      new Date(

        currentYear,

        currentMonth - 1,

        1

      )

    );

  };




  // ===============================
  // Next Month
  // ===============================

  const nextMonth = () => {

    setCurrentDate(

      new Date(

        currentYear,

        currentMonth + 1,

        1

      )

    );

  };




  // ===============================
  // Upcoming Tasks
  // ===============================

  const upcomingTasks = useMemo(() => {

    return [...tasks].sort(

      (a, b) =>

        new Date(a.dueDate) -

        new Date(b.dueDate)

    );

  }, [tasks]);

    if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 text-slate-500">
              Loading Calendar...
            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }



  return (

    <DashboardLayout>

      <div className="space-y-8">



        {/* Header */}

        <div className="
          rounded-3xl
          bg-slate-900
          dark:bg-slate-950
          p-8
          shadow-xl
          text-white
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-start
            lg:items-center
            gap-6
          ">

            <div>

              <h1 className="text-4xl font-bold">

                Calendar

              </h1>

              <p className="text-slate-300 mt-2">

                Track project deadlines and upcoming tasks.

              </p>

            </div>



            <div className="flex gap-3">

              <button

                onClick={previousMonth}

                className="
                px-5
                py-3
                rounded-xl
                bg-white/10
                hover:bg-white/20
                transition
                "

              >

                ← Previous

              </button>



              <button

                onClick={nextMonth}

                className="
                px-5
                py-3
                rounded-xl
                bg-white/10
                hover:bg-white/20
                transition
                "

              >

                Next →

              </button>

            </div>

          </div>

        </div>





        {/* Calendar */}

        <div className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          shadow-lg
          border
          border-slate-200
          dark:border-slate-700
          p-6
        ">

          <div className="
            flex
            justify-between
            items-center
            mb-8
          ">

            <h2 className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            ">

              {monthName} {currentYear}

            </h2>

          </div>



          <div className="grid grid-cols-7 gap-4">

            {

              ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

              .map(day=>(

                <div

                  key={day}

                  className="
                  text-center
                  font-semibold
                  text-slate-500
                  dark:text-slate-400
                  py-2
                  "

                >

                  {day}

                </div>

              ))

            }



            {

              Array.from({ length:firstDay }).map((_,index)=>(

                <div key={index}></div>

              ))

            }



            {

              Array.from(

                {length:totalDays},

                (_,i)=>i+1

              ).map(day=>{

                const dayTasks = tasks.filter(task=>{

                  if(!task.dueDate) return false;

                  const date = new Date(task.dueDate);

                  return (

                    date.getDate()===day &&

                    date.getMonth()===currentMonth &&

                    date.getFullYear()===currentYear

                  );

                });



                const today = new Date();

                const isToday =

                  today.getDate()===day &&

                  today.getMonth()===currentMonth &&

                  today.getFullYear()===currentYear;



                return(

                  <div

                    key={day}

                    className={`
                      min-h-[130px]
                      rounded-2xl
                      border
                      p-3
                      transition-all
                      duration-300
                      hover:shadow-lg
                      hover:-translate-y-1

                      ${
                        isToday

                        ?

                        "border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800"

                        :

                        "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      }
                    `}
                  >

                    <div className="
                      flex
                      justify-between
                      items-center
                    ">

                      <span className="
                        font-bold
                        text-slate-800
                        dark:text-white
                      ">

                        {day}

                      </span>

                    </div>



                    <div className="mt-3 space-y-2">

                      {

                        dayTasks.slice(0,2).map(task=>(

                          <div

                            key={task._id}

                            className="
                              rounded-lg
                              bg-slate-900
                              text-white
                              dark:bg-slate-700
                              text-xs
                              px-2
                              py-1
                              truncate
                            "

                          >

                            {task.title}

                          </div>

                        ))

                      }

                    </div>

                  </div>

                );

              })

            }

          </div>

        </div>

                {/* Upcoming Tasks */}

        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            ">

              Upcoming Tasks

            </h2>

            <span className="
              px-4
              py-2
              rounded-xl
              bg-slate-100
              dark:bg-slate-800
              text-slate-600
              dark:text-slate-300
              text-sm
              font-medium
            ">

              {upcomingTasks.length} Tasks

            </span>

          </div>



          {

            upcomingTasks.length > 0 ? (

              <div className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              ">

                {

                  upcomingTasks.map((task)=>(

                    <CalendarEventCard

                      key={task._id}

                      event={{
                        title: task.title,
                        date: task.dueDate,
                        type: task.status,
                        priority: task.priority,
                        project:
                          task.project?.title || "No Project",
                      }}

                    />

                  ))

                }

              </div>

            ) : (

              <div className="
                rounded-3xl
                border
                border-dashed
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                p-12
                text-center
              ">

                <h3 className="
                  text-xl
                  font-bold
                  text-slate-700
                  dark:text-white
                ">

                  No Upcoming Tasks

                </h3>

                <p className="
                  mt-2
                  text-slate-500
                ">

                  Create a task with a due date to see it here.

                </p>

              </div>

            )

          }

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Calendar;