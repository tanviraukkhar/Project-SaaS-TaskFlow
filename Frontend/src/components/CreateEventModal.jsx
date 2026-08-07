import { useEffect, useState } from "react";


function CreateEventModal({
  isOpen,
  onClose,
  onSave,
}) {


  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "Meeting",
  });



  useEffect(() => {

    if (isOpen) {

      setFormData({
        title: "",
        date: "",
        type: "Meeting",
      });

    }

  }, [isOpen]);




  if (!isOpen) return null;




  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(formData);

  };





  return (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    ">


      <div className="
        bg-white
        rounded-2xl
        p-6
        w-full
        max-w-md
      ">


        <h2 className="text-2xl font-bold mb-5">
          Add Event
        </h2>



        <form onSubmit={handleSubmit}>


          <input

            type="text"

            placeholder="Event Title"

            value={formData.title}

            onChange={(e)=>
              setFormData({
                ...formData,
                title:e.target.value
              })
            }

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            "

            required

          />




          <input

            type="text"

            placeholder="Date (Example: 20 Aug 2026)"

            value={formData.date}

            onChange={(e)=>
              setFormData({
                ...formData,
                date:e.target.value
              })
            }

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            "

            required

          />





          <select

            value={formData.type}

            onChange={(e)=>
              setFormData({
                ...formData,
                type:e.target.value
              })
            }

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-5
            "

          >

            <option>
              Meeting
            </option>


            <option>
              Deadline
            </option>


            <option>
              Presentation
            </option>


            <option>
              Other
            </option>


          </select>







          <div className="flex gap-3">


            <button

              type="button"

              onClick={onClose}

              className="
              flex-1
              bg-gray-200
              py-3
              rounded-xl
              "

            >
              Cancel
            </button>




            <button

              type="submit"

              className="
              flex-1
              bg-indigo-600
              text-white
              py-3
              rounded-xl
              "

            >
              Save

            </button>



          </div>



        </form>



      </div>


    </div>

  );

}


export default CreateEventModal;