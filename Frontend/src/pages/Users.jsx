import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import UserCard from "../components/UserCard";
import DeleteModal from "../components/DeleteModal";

import API from "../api/axios";



function Users() {


  const [users,setUsers] = useState([]);

  const [loading,setLoading] = useState(true);


  const [searchTerm,setSearchTerm] = useState("");

  const [roleFilter,setRoleFilter] = useState("All");


  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);





  // ===============================
  // Fetch Users
  // ===============================

  const fetchUsers = async()=>{


    try{


      setLoading(true);


      const res = await API.get("/users");


      setUsers(
        res.data.users || []
      );



    }catch(error){


      console.log(
        error.response?.data?.message
      );


    }finally{


      setLoading(false);


    }


  };


  const handleDeleteUser = async()=>{

    try{

      await API.delete(`/users/${deleteId}`);

      fetchUsers();

      setDeleteId(null);

      setIsDeleteOpen(false);

    }catch(error){

      console.log(
        error.response?.data?.message
      );

    }

  };





  useEffect(()=>{


    fetchUsers();


  },[]);









  // ===============================
  // Search + Filter
  // ===============================

  const filteredUsers = useMemo(()=>{


    return users.filter((user)=>{


      const searchMatch =

        user.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

        ||

        user.email
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );




      const roleMatch =

        roleFilter === "All"

        ||

        user.role === roleFilter;




      return searchMatch && roleMatch;



    });



  },[
    users,
    searchTerm,
    roleFilter
  ]);








  return (


    <DashboardLayout>



      <div>


        {/* Header */}

        <div className="mb-8">


          <h1 className="text-3xl font-bold text-gray-800">

            Users

          </h1>


          <p className="text-gray-500 mt-2">

            Manage registered users and members.

          </p>



        </div>







        {/* User Count */}

        <div className="
rounded-3xl
bg-slate-900
dark:bg-slate-950
p-8
text-white
shadow-xl
mb-8
">


          <h2 className="text-lg">

            Total Members

          </h2>


          <p className="text-4xl font-bold mt-2">

            {users.length}

          </p>



        </div>









        {/* Filter */}


        <div className="grid md:grid-cols-2 gap-4 mb-8">



          <input


            type="text"


            placeholder="Search User..."


            value={searchTerm}


            onChange={(e)=>
              setSearchTerm(
                e.target.value
              )
            }


            className="border rounded-xl px-4 py-3"



          />







          <select


            value={roleFilter}


            onChange={(e)=>
              setRoleFilter(
                e.target.value
              )
            }


            className="border rounded-xl px-4 py-3"



          >


            <option>
              All
            </option>


            <option>
              Admin
            </option>


            <option>
              Employee
            </option>



          </select>




        </div>









        {

          loading ?


          (

            <h2 className="text-center text-gray-500">

              Loading Users...

            </h2>


          )

          :


          (


            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


              {


                filteredUsers.length > 0 ?


                filteredUsers.map((user)=>(


                  <UserCard

                    key={user._id}

                    user={user}

                    onDelete={()=>{

                      setDeleteId(user._id);

                      setIsDeleteOpen(true);

                    }}

                  />


                ))



                :


                (

                  <div className="col-span-full text-center py-12">


                    <h2 className="text-2xl font-bold text-gray-600">

                      No User Found

                    </h2>


                  </div>


                )


              }



            </div>


          )


        }



        <DeleteModal

          isOpen={isDeleteOpen}

          onClose={()=>{

            setDeleteId(null);

            setIsDeleteOpen(false);

          }}

          onConfirm={handleDeleteUser}

          title="Delete User"

          message="Are you sure you want to delete this user? This action cannot be undone."

        />



      </div>



    </DashboardLayout>


  );

}



export default Users;
