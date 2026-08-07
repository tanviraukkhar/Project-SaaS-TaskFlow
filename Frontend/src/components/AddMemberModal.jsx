import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";

function AddMemberModal({

  isOpen,
  onClose,
  projectId,
  currentMembers = [],
  onMemberAdded,

}) {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [addingId, setAddingId] = useState(null);



  // ===============================
  // Load Users
  // ===============================

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const res = await API.get("/users");

      setUsers(
        res.data.users || []
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

    if (isOpen) {

      fetchUsers();

    }

  }, [isOpen]);



  // ===============================
  // Already Added Members
  // ===============================

  const memberIds = useMemo(() => {

    return currentMembers.map(
      (member) => member._id
    );

  }, [currentMembers]);



  // ===============================
  // Search Filter
  // ===============================

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const searchMatch =

        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return searchMatch;

    });

  }, [users, search]);



  // ===============================
  // Add Member
  // ===============================

  const handleAddMember = async (userId) => {

    try {

      setAddingId(userId);

      await API.post(

        `/projects/${projectId}/members`,

        {

          userId,

        }

      );

      if (onMemberAdded) {

        onMemberAdded();

      }

    } catch (error) {

      console.log(
        error.response?.data?.message
      );

    } finally {

      setAddingId(null);

    }

  };
    if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">

            Add Team Member

          </h2>

          <button

            onClick={onClose}

            className="text-2xl text-gray-500 hover:text-red-500"

          >

            ×

          </button>

        </div>



        {/* Search */}

        <div className="p-6">

          <input

            type="text"

            placeholder="Search user..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"

          />

        </div>



        {/* Users */}

        <div className="px-6 pb-6 max-h-[420px] overflow-y-auto">

          {

            loading ?

            (

              <div className="text-center py-10 text-gray-500">

                Loading users...

              </div>

            )

            :

            filteredUsers.length > 0 ?

            (

              <div className="space-y-3">

                {

                  filteredUsers.map((user)=>{

                    const alreadyMember =
                      memberIds.includes(user._id);

                    return (

                      <div

                        key={user._id}

                        className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"

                      >

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg">

                            {user.name?.charAt(0).toUpperCase()}

                          </div>

                          <div>

                            <h3 className="font-semibold">

                              {user.name}

                            </h3>

                            <p className="text-sm text-gray-500">

                              {user.email}

                            </p>

                            <span className="inline-block mt-1 text-xs bg-gray-100 px-2 py-1 rounded-full">

                              {user.role}

                            </span>

                          </div>

                        </div>



                        {

                          alreadyMember ?

                          (

                            <span className="text-green-600 font-semibold">

                              Added

                            </span>

                          )

                          :

                          (

                            <button

                              onClick={()=>

                                handleAddMember(user._id)

                              }

                              disabled={addingId===user._id}

                              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-xl"

                            >

                              {

                                addingId===user._id

                                ?

                                "Adding..."

                                :

                                "Add"

                              }

                            </button>

                          )

                        }

                      </div>

                    );

                  })

                }

              </div>

            )

            :

            (

              <div className="text-center py-10 text-gray-500">

                No users found.

              </div>

            )

          }

        </div>



        {/* Footer */}

        <div className="border-t p-5 flex justify-end">

          <button

            onClick={onClose}

            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl"

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}

export default AddMemberModal;