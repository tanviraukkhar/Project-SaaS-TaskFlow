import {
  User,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Calendar,
  CheckCircle2,
  Pencil,
} from "lucide-react";

function ProfileCard({ profile, onEdit }) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-gray-200
      dark:border-slate-800
      bg-white/90
      dark:bg-slate-900/80
      backdrop-blur-xl
      shadow-xl
      p-8
      transition-all
      duration-300
      hover:shadow-2xl
    "
    >
      {/* Header */}

      <div className="flex flex-col items-center">

        <div
          className="
          w-28
          h-28
          rounded-full
          bg-slate-900
          text-white
          flex
          items-center
          justify-center
          text-4xl
          font-bold
          shadow-lg
        "
        >
          {profile.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
          {profile.name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-slate-400">
          <Mail size={16} />
          <span>{profile.email}</span>
        </div>

      </div>

      {/* Details */}

      <div className="mt-8 space-y-4">

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">

          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <Phone size={18} />
            Phone
          </div>

          <span className="font-medium text-gray-900 dark:text-white">
            {profile.phone || "N/A"}
          </span>

        </div>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">

          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <Briefcase size={18} />
            Department
          </div>

          <span className="font-medium text-gray-900 dark:text-white">
            {profile.department || "N/A"}
          </span>

        </div>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">

          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <Shield size={18} />
            Role
          </div>

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-slate-900
            text-white
            text-sm
            font-semibold
          "
          >
            {profile.role}
          </span>

        </div>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3">

          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <CheckCircle2 size={18} />
            Status
          </div>

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-emerald-100
            text-emerald-700
            dark:bg-emerald-900/30
            dark:text-emerald-400
            text-sm
            font-semibold
          "
          >
            {profile.status || "Active"}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <Calendar size={18} />
            Member Since
          </div>

          <span className="font-medium text-gray-900 dark:text-white">
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "N/A"}
          </span>

        </div>

      </div>

      {/* Button */}

      <button
        onClick={onEdit}
        className="
        mt-8
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-slate-900
        hover:bg-slate-800
        text-white
        py-3.5
        font-semibold
        transition-all
        duration-300
      "
      >
        <Pencil size={18} />
        Edit Profile
      </button>

    </div>
  );
}

export default ProfileCard;