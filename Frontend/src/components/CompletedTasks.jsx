

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Link } from "react-router-dom";

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function fetchCompletedTasks() {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/tasks/completed`, {
          withCredentials: true,
        });

        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCompletedTasks();
  }, [user]);

  // 🔐 If not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Please Login First
        </h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    );
  }

  // ⏳ Loading
  if (loading) {
    return <div className="text-center mt-10">Loading completed tasks...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Completed Tasks ✅
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-600 mt-4">
          No completed tasks yet.
        </p>
      ) : (
        <div className="grid gap-4 mt-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="font-semibold text-lg">
                {task.title}
              </h2>

              <p className="text-gray-600">
                {task.description}
              </p>

              <span className="text-green-600 text-sm">
                ✔ Completed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
