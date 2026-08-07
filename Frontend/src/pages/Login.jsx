import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", {
        email,
        password,
      });


      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      // Redirect Dashboard
      navigate("/dashboard");


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>


        <p className="text-center text-gray-500 mt-2">
          Login to your TaskFlow account
        </p>


        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}


        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >


          {/* Email */}

          <div>

            <label className="text-sm text-gray-700">
              Email Address
            </label>


            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>



          {/* Password */}

          <div>

            <label className="text-sm text-gray-700">
              Password
            </label>


            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >

            {loading ? "Logging in..." : "Login"}

          </button>


        </form>



        <p className="text-center text-gray-500 mt-6">

          Don't have an account?

          <a
            href="/register"
            className="text-indigo-600 ml-2 font-medium"
          >
            Sign Up
          </a>

        </p>


      </div>

    </div>
  );
}

export default Login;