import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MemberCard from "../components/MemberCard";
import CreateMemberModal from "../components/CreateMemberModal";
import DeleteMemberModal from "../components/DeleteMemberModal";


function Team() {


  const defaultMembers = [
    {
      name: "Tanvir Alam",
      email: "tanvir@example.com",
      role: "Admin",
      department: "Management",
    },
    {
      name: "Rahim Ahmed",
      email: "rahim@example.com",
      role: "Developer",
      department: "Development",
    },
    {
      name: "Karim Hasan",
      email: "karim@example.com",
      role: "Designer",
      department: "UI/UX",
    },
  ];



  const [members, setMembers] = useState(() => {

    const saved =
      localStorage.getItem("members");

    return saved
      ? JSON.parse(saved)
      : defaultMembers;

  });




  const [searchTerm, setSearchTerm] = useState("");



  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const [editingIndex, setEditingIndex] =
    useState(null);




  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);



  const [deleteIndex, setDeleteIndex] =
    useState(null);





  useEffect(() => {

    localStorage.setItem(
      "members",
      JSON.stringify(members)
    );

  }, [members]);







  const handleSaveMember = (memberData) => {


    if (editingIndex !== null) {


      const updated = [...members];


      updated[editingIndex] = memberData;


      setMembers(updated);


      setEditingIndex(null);


    } else {


      setMembers([
        ...members,
        memberData
      ]);


    }



    setIsModalOpen(false);


  };







  const handleDeleteMember = () => {


    const updated =
      members.filter(
        (_, index) =>
          index !== deleteIndex
      );


    setMembers(updated);



    setDeleteIndex(null);

    setIsDeleteOpen(false);


  };








  const filteredMembers =
    members.filter((member)=>


      member.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )


      ||

      member.email
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )


    );







  return (

    <DashboardLayout>


      <div>



        {/* Header */}


        <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">


          <div>


            <h1 className="text-3xl font-bold text-gray-800">
              Team Members
            </h1>


            <p className="text-gray-500 mt-2">
              Manage your team members and roles.
            </p>


          </div>




          <button

            onClick={()=>{
              setEditingIndex(null);
              setIsModalOpen(true);
            }}

            className="
            bg-indigo-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-indigo-700
            "
          >

            + Add Member

          </button>



        </div>








        {/* Search */}


        <input

          type="text"

          placeholder="🔍 Search member..."

          value={searchTerm}

          onChange={(e)=>
            setSearchTerm(e.target.value)
          }

          className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          mb-8
          outline-none
          focus:ring-2
          focus:ring-indigo-500
          "

        />









        {/* Members */}


        <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        ">



          {
            filteredMembers.length > 0 ? (


              filteredMembers.map(
                (member,index)=>(


                  <MemberCard

                    key={index}

                    member={member}


                    onEdit={()=>{

                      setEditingIndex(index);

                      setIsModalOpen(true);

                    }}


                    onDelete={()=>{

                      setDeleteIndex(index);

                      setIsDeleteOpen(true);

                    }}


                  />


                )

              )


            ) : (


              <div className="bg-white p-6 rounded-xl shadow">

                <p className="text-gray-500">
                  No member found.
                </p>


              </div>


            )

          }



        </div>









        {/* Create/Edit Modal */}



        <CreateMemberModal

          isOpen={isModalOpen}


          onClose={()=>{

            setIsModalOpen(false);

            setEditingIndex(null);

          }}


          onSave={handleSaveMember}


          member={
            editingIndex !== null
            ? members[editingIndex]
            : null
          }


        />









        {/* Delete Modal */}



        <DeleteMemberModal

          isOpen={isDeleteOpen}


          onClose={()=>{

            setIsDeleteOpen(false);

            setDeleteIndex(null);

          }}


          onConfirm={handleDeleteMember}


        />





      </div>


    </DashboardLayout>

  );

}


export default Team;