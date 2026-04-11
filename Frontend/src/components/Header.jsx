
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTasks } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constant";

function Header() {

    const navigate=useNavigate()

  async  function handleLogout(){

        const res=await axios.post(`${BASE_URL}/auth/logout`,{},{withCredentials:true})

        if(res.data.success===true){
            navigate("/")
        }
    }

  return (
    <>
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
     
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <FaTasks />
        <span>TaskScheduler</span>
      </div>

      {/*  Links */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/tasks" className="hover:text-blue-600">My Tasks</Link>
        <Link to="/completed" className="hover:text-blue-600">Completed</Link>
         <Link to="/create" className="hover:text-blue-600">create Task</Link>
      </nav>

      
      <div className="flex items-center gap-4">
        
        {/*  logout  */}
        <button onClick={handleLogout} className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400 transition">
          <FaSignOutAlt />
        </button>

      
        
      
       
      </div>
    </header>
       <Outlet />

       </>
  );
}

export default Header;