function TaskHistoryModal({
  isOpen,
  onClose,
  activities
}) {


  if(!isOpen) return null;


  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">


        <div className="flex justify-between items-center mb-5">


          <h2 className="text-2xl font-bold">
            Activity History
          </h2>



          <button

            onClick={onClose}

            className="text-gray-500 hover:text-red-500 text-xl"

          >

            ✕

          </button>


        </div>





        {
          activities?.length > 0 ? (


            <div className="space-y-4 max-h-[400px] overflow-y-auto">


              {
                activities.map((activity,index)=>(


                  <div

                    key={index}

                    className="border rounded-xl p-4 bg-gray-50"

                  >


                    <div className="flex justify-between">


                      <p className="font-semibold text-gray-800">

                        {activity.user?.name || "Unknown"}

                      </p>



                      <p className="text-xs text-gray-500">

                        {
                          new Date(activity.date)
                          .toLocaleString()
                        }

                      </p>


                    </div>




                    <p className="text-gray-600 mt-2">

                      {activity.action}

                    </p>



                  </div>


                ))

              }


            </div>


          )

          :


          (

            <p className="text-gray-500">
              No activity found.
            </p>

          )

        }



      </div>


    </div>

  );

}


export default TaskHistoryModal;