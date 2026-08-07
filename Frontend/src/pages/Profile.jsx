import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ProfileCard from "../components/ProfileCard";
import EditProfileModal from "../components/EditProfileModal";

import API from "../api/axios";

function Profile() {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);



  // ===============================
  // Get Profile
  // ===============================
  const fetchProfile = async () => {

    try {

      const res = await API.get(
        "/auth/profile"
      );

      setProfile(res.data.user);

    } catch (error) {

      console.log(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchProfile();

  }, []);




  // ===============================
  // Update Profile
  // ===============================
  const handleSaveProfile = async (
    updatedProfile
  ) => {

    try {

      const res = await API.put(
        "/auth/profile",
        {
          name: updatedProfile.name,
          phone: updatedProfile.phone,
        }
      );

      setProfile(res.data.user);

      setIsModalOpen(false);

    } catch (error) {

      console.log(
        error.response?.data?.message
      );

    }

  };




  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-center py-20">

          Loading Profile...

        </div>

      </DashboardLayout>

    );

  }



  return (

    <DashboardLayout>

      <div>

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your personal information.
            </p>

          </div>

        </div>



        <div className="max-w-2xl">

          <ProfileCard

            profile={profile}

            onEdit={() =>
              setIsModalOpen(true)
            }

          />

        </div>



        <EditProfileModal

          isOpen={isModalOpen}

          onClose={() =>
            setIsModalOpen(false)
          }

          onSave={handleSaveProfile}

          profile={profile}

        />

      </div>

    </DashboardLayout>

  );

}

export default Profile;