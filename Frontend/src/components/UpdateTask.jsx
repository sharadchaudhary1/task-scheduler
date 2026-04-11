import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  //  Fetch task from server bu using a api call
  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await axios.get(`${BASE_URL}/tasks/gettask/${id}`, {
          withCredentials: true,
        });

        const task = res.data.task;

        setTitle(task.title || "");
        setDescription(task.description || "");
        setPriority(task.priority || "medium");

        //  format date 
        if (task.dueDate) {
          setDueDate(task.dueDate.split("T")[0]);
        }
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }

    fetchTask();
  }, [id]);

  // Submit the updated task
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.patch(
        `${BASE_URL}/tasks/${id}`,
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );

      alert("Task updated successfully");
      navigate("/tasks");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md bg-blue-300 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl text-center font-bold text-blue-600 mb-4">
          Update Task
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="px-4 py-2 bg-blue-100 border rounded"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="px-4 py-2 bg-blue-100 border rounded"
          />

        
          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 bg-blue-100 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-2 bg-blue-100 border rounded"
          />

          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;