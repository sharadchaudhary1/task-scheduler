
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  //  submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BASE_URL}/tasks`,
        {
          title,
          description,
          status,
          priority,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );

      alert("Task created successfully");

      // reset form (optional)
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
      setDueDate("");

      navigate("/tasks");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md bg-blue-300 p-6 rounded-xl shadow-lg">
        
        <h2 className="text-2xl text-center font-bold text-blue-800 mb-4">
          Create Task
        </h2>

        <form onSubmit={handleSubmit} className="flex bg-blue-300 flex-col gap-4">

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="px-4 py-2 border bg-blue-100 rounded"
            required
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="px-4 py-2 bg-blue-100 border rounded"
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 bg-blue-100 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
          </select>

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

          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;