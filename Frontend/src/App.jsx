import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { Register } from "./components/Register";
import Tasks from "./components/Tasks";
import Home from "./components/Home";
import UpdateTask from "./components/UpdateTask";
import CreateTask from "./components/CreateTask";
import CompletedTasks from "./components/CompletedTasks";

function App() {
  return (
    <div>
    

     
     <Routes>
       
       <Route element={<Header/>}>
         <Route path="/" element={<Home/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/create" element={<CreateTask/>}/>
            <Route path="/update/:id" element={<UpdateTask/>}/>
            <Route path="/completed" element={<CompletedTasks/>}/>

       </Route>
      
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     
     

     </Routes>

    </div>
  );
}

export default App;