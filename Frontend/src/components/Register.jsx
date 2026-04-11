
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
 

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      gender,
    
    };

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, newUser);
      
      console.log(res)
      if (res.data.success===true) {
        navigate("/login");
      }

      // reset
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setGender("");
   
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">

      {/* Card */}
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 animate-fadeIn">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register Yourself
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col gap-3">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="First Name"
              required
              className=" px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Last Name"
              required
              className=" px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400"
          />

    

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className=" px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled className="text-gray-400" >
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
       
          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-600 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};