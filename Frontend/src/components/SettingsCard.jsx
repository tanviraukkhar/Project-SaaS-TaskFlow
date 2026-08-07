import {
  Moon,
  Mail,
  Bell,
} from "lucide-react";

function SettingsCard({
  settings,
  onChange,
}) {

  const settingItems = [

    {
      key: "darkMode",
      title: "Dark Mode",
      description:
        "Switch between light and dark appearance.",
      icon: Moon,
    },

    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important updates by email.",
      icon: Mail,
    },

    {
      key: "pushNotifications",
      title: "Push Notifications",
      description:
        "Receive browser notifications instantly.",
      icon: Bell,
    },

  ];

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white/80
        dark:bg-slate-900/70
        backdrop-blur-xl
        shadow-xl
        dark:border-slate-800
        overflow-hidden
      "
    >

      {/* Header */}

      <div
        className="
          px-8
          py-6
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Application Settings
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Customize your workspace preferences.
        </p>

      </div>

      {/* Settings */}

      <div className="p-8 space-y-5">

        {

          settingItems.map((item) => {

            const Icon = item.icon;

            return (

              <div

                key={item.key}

                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800/60
                  p-5
                  transition-all
                  duration-300
                  hover:shadow-lg
                  hover:-translate-y-0.5
                "

              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      h-12
                      w-12
                      rounded-2xl
                      bg-slate-900
                      dark:bg-slate-700
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Icon size={20} />

                  </div>

                  <div>

                    <h3
                      className="
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {item.description}
                    </p>

                  </div>

                </div>

                {/* Toggle */}

                <label className="relative inline-flex cursor-pointer">

                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) =>
                      onChange(
                        item.key,
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />

                  <div
                    className="
                      w-12
                      h-7
                      bg-slate-300
                      dark:bg-slate-600
                      rounded-full
                      peer
                      peer-checked:bg-slate-900
                      dark:peer-checked:bg-white
                      after:content-['']
                      after:absolute
                      after:top-1
                      after:left-1
                      after:h-5
                      after:w-5
                      after:bg-white
                      dark:after:bg-slate-900
                      after:rounded-full
                      after:transition-all
                      peer-checked:after:translate-x-5
                    "
                  />

                </label>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}

export default SettingsCard;