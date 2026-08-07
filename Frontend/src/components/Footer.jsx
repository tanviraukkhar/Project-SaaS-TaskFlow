function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">
            TaskFlow
          </h2>

          <p className="mt-3 text-gray-400">
            A modern project management platform
            for teams to work smarter.
          </p>
        </div>


        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg">
            Product
          </h3>

          <ul className="mt-3 space-y-2 text-gray-400">
            <li>Features</li>
            <li>Pricing</li>
            <li>Dashboard</li>
          </ul>
        </div>


        {/* Contact */}
        <div id="contact">
          <h3 className="font-semibold text-lg">
            Contact
          </h3>

          <p className="mt-3 text-gray-400">
            support@taskflow.com
            
          </p>

          <p className="text-gray-400">
            Dhaka, Bangladesh
          </p>
        </div>

      </div>


      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        © 2026 TaskFlow. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;