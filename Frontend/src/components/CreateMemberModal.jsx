import { useEffect, useState } from "react";


function CreateMemberModal({
  isOpen,
  onClose,
  onSave,
  member,
}) {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Developer",
    department: "",
  });



  useEffect(() => {

    if (member) {

      setFormData(member);

    } else {

      setFormData({
        name: "",
        email: "",
        role: "Developer",
        department: "",
      });

    }

  }, [member, isOpen]);





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
        w-full
        max-w-md
        rounded-2xl
        p-6
      ">


        <h2 className="text-2xl font-bold text-gray-800 mb-5">

          {member ? "Edit Member" : "Add Member"}

        </h2>




        <form onSubmit={handleSubmit}>



          <input
            type="text"
            placeholder="Member Name"
            value={formData.name}
            onChange={(e)=>
              setFormData({
                ...formData,
                name:e.target.value
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
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e)=>
              setFormData({
                ...formData,
                email:e.target.value
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
            value={formData.role}
            onChange={(e)=>
              setFormData({
                ...formData,
                role:e.target.value
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
          >

            <option>
              Admin
            </option>

            <option>
              Manager
            </option>

            <option>
              Developer
            </option>

            <option>
              Designer
            </option>


          </select>





          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e)=>
              setFormData({
                ...formData,
                department:e.target.value
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
            required
          />






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
              hover:bg-indigo-700
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


export default CreateMemberModal;