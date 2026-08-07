function MemberCard({ member, onEdit, onDelete }) {

  return (

    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">


      <div className="flex justify-between items-start">


        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {member.name}
          </h2>


          <p className="text-gray-500 mt-2">
            {member.email}
          </p>


        </div>



        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            member.role === "Admin"
              ? "bg-red-100 text-red-600"
              : member.role === "Manager"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {member.role}
        </span>


      </div>




      <div className="mt-5">


        <p className="text-sm text-gray-500">
          Department
        </p>


        <p className="font-semibold text-gray-700">
          {member.department}
        </p>


      </div>





      <div className="flex gap-3 mt-6">


        <button
          onClick={onEdit}
          className="
          flex-1
          bg-indigo-600
          text-white
          py-2
          rounded-xl
          hover:bg-indigo-700
          "
        >
          Edit
        </button>



        <button
          onClick={onDelete}
          className="
          flex-1
          bg-red-600
          text-white
          py-2
          rounded-xl
          hover:bg-red-700
          "
        >
          Delete
        </button>


      </div>



    </div>

  );

}


export default MemberCard;