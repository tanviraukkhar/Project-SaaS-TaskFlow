import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import SettingsCard from "../components/SettingsCard";
import ChangePasswordModal from "../components/ChangePasswordModal";


function Settings() {


  const defaultSettings = {

    darkMode: false,

    emailNotifications: true,

    pushNotifications: true,

    language: "English",

  };



  const [settings, setSettings] = useState(() => {

    const saved =
      localStorage.getItem("settings");

    return saved
      ? JSON.parse(saved)
      : defaultSettings;

  });



  const [isPasswordOpen, setIsPasswordOpen] =
    useState(false);




  // Save settings
  useEffect(() => {

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

  }, [settings]);




  // Apply Dark Mode
  useEffect(() => {

    if (settings.darkMode) {

      document.documentElement.classList.add(
        "dark"
      );


      localStorage.setItem(
        "darkMode",
        "true"
      );


    } else {

      document.documentElement.classList.remove(
        "dark"
      );


      localStorage.setItem(
        "darkMode",
        "false"
      );

    }


  }, [settings.darkMode]);





  const handleSettingChange = (
    key,
    value
  ) => {


    setSettings({

      ...settings,

      [key]: value,

    });


  };





  return (

    <DashboardLayout>

      <div>


        <div className="mb-8">


          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>


          <p className="text-gray-500 mt-2">
            Manage your application preferences.
          </p>


        </div>





        <div className="max-w-2xl">


          <SettingsCard


            settings={settings}


            onChange={handleSettingChange}


            onChangePassword={() =>
              setIsPasswordOpen(true)
            }


          />


        </div>





        <ChangePasswordModal


          isOpen={isPasswordOpen}


          onClose={() =>
            setIsPasswordOpen(false)
          }


        />



      </div>


    </DashboardLayout>

  );

}


export default Settings;