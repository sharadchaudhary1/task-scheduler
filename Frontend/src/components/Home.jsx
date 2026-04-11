

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center text-center px-4">

      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
        Organize Your Tasks Efficiently 🚀
      </h1>

      <p className="text-gray-600 max-w-xl mb-6">
        A simple and powerful task scheduler to manage your daily work,
        stay productive, and never miss deadlines.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">

        {user ? (
          <button
            onClick={() => navigate("/tasks")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to My Tasks
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 w-full max-w-5xl">

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2 text-blue-600">📋 Manage Tasks</h3>
          <p className="text-gray-600 text-sm">
            Create, update, and delete tasks easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2 text-blue-600">⏰ Stay Organized</h3>
          <p className="text-gray-600 text-sm">
            Keep track of deadlines and priorities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2 text-blue-600">🚀 Boost Productivity</h3>
          <p className="text-gray-600 text-sm">
            Focus on what matters and get things done.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;