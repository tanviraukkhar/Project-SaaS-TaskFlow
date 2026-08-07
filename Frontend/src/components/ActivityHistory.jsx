function ActivityHistory({ activities }) {


  return (

    <div className="mt-6">


      <h3 className="text-lg font-bold mb-4">
        Activity History
      </h3>



      {
        activities?.length > 0 ? (


          <div className="space-y-3">


            {
              activities.map((activity,index)=>(


                <div

                  key={index}

                  className="bg-gray-50 rounded-lg p-3 border"

                >


                  <div className="flex justify-between">


                    <p className="font-semibold text-gray-800">

                      {activity.user?.name || "Unknown User"}

                    </p>



                    <p className="text-sm text-gray-500">

                      {
                        new Date(activity.date)
                        .toLocaleString()
                      }

                    </p>


                  </div>



                  <p className="text-gray-600 mt-1">

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
            No activity yet.
          </p>

        )


      }


    </div>

  );

}


export default ActivityHistory;