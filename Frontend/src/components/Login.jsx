import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {setUser}=useContext(AuthContext)

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const UserData = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        UserData,
        { withCredentials: true }
      );
         
      setUser(res.data.user)
      console.log(res.data)
      
      if (res.data.success === true) {
       navigate("/")
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your Email"
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Enter your Password"
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 text-center mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register Yourself
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;