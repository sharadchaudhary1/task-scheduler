import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";



const Tasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(user)

  useEffect(() => {
    if (!user) return;

    async function fetchTasks() {
      setLoading(true);

      try {
        const res = await axios.get(`${BASE_URL}/tasks`, {
          withCredentials: true,
        });

        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [user]);


// change the status of task
async function handleStatusChange(id, newStatus) {
  try {
    await axios.patch(
      `${BASE_URL}/tasks/${id}`,
      { status: newStatus },
      { withCredentials: true }
    );

    // update UI
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}



async function handleDelete(id) {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`, {
      withCredentials: true,
    });

    setTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

  // user  is not loggedin 
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Task Scheduler 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          Login to manage your tasks efficiently.
        </p>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    );
  }

  //  Loading
  if (loading) {
    return <div className="text-center mt-10">Loading tasks...</div>;
  }

  //  when user is logged in 
  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Welcome, {user.firstname} 
      </h1>

      <h2 className="text-xl font-semibold mt-4 mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found. Start adding tasks!</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
           <div
  key={task._id}
  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
>
  <h2 className="font-semibold text-lg">{task.title}</h2>
  <p className="text-gray-600">{task.description}</p>

  <span className="text-sm text-blue-500 block mb-2">
    Status: {task.status}
  </span>

 
  <div className="flex justify-between gap-3 mt-3">

   {/* update the status of task */}
  <select
  value={task.status}
  onChange={(e) => handleStatusChange(task._id, e.target.value)}
  className="px-3 py-1 border rounded bg-blue-50"
>
  <option value={task.status}>{task.status}</option>

  {task.status === "pending" && (
    <>
      <option value="progress">progress</option>
      <option value="completed">completed</option>
    </>
  )}

  {task.status === "progress" && (
    <option value="completed">completed</option>
  )}
</select>
    {/* Update Button */}
    
    <div className="flex gap-2">
    <Link
      to={`/update/${task._id}`}
      className="px-3  py-1 bg-blue-500 flex justify-center items-center text-white rounded hover:bg-blue-600"
    >
      <FaEdit />  
    </Link>

    <button onClick={()=>handleDelete(task._id)} className="bg-red-400 rounded p-4 hover:bg-red-500 " > <FaTrash /> </button>
    
      </div>
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
};


export default  Tasks