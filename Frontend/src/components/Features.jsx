function Features() {
  const features = [
    {
      title: "Project Management",
      description:
        "Create, organize and track all your projects from one place.",
    },
    {
      title: "Team Collaboration",
      description:
        "Work together with your team and manage tasks efficiently.",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor project progress with real-time updates and reports.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-yellow-400">
            Everything you need to manage projects
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Powerful tools to help your team work faster and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;