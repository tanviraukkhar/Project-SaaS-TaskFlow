import { useEffect, useState } from "react";

function Pricing() {
  const slides = [
    {
      title: "Project Dashboard",
      image: "/images/deshboard1.jpg",
      description:
        "Manage all your projects from a powerful and organized dashboard.",
    },
    {
      title: "Task Management",
      image: "/images/deshboard2.jpg",
      description:
        "Create, assign and track tasks with your team easily.",
    },
    {
      title: "Calendar & Schedule",
      image: "/images/deshboard3.jpg",
      description:
        "Plan deadlines and keep your workflow organized.",
    },
    {
      title: "Reports & Analytics",
      image: "/images/deshboard4.jpg",
      description:
        "Analyze project performance with detailed reports.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="pricing"
      className="py-12 sm:py-20 bg-gray-100 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-yellow-400">
            Explore TaskFlow
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover powerful tools designed to simplify project management,
            improve collaboration, and boost your team's productivity.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full"
              >

                <div className="relative">

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[250px] sm:h-[380px] md:h-[520px] object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">

                    <div className="inline-block max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5">

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        {slide.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-200">
                        {slide.description}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-8 h-3 bg-indigo-600"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pricing;