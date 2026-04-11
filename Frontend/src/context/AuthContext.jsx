
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constant";


export  const AuthContext=createContext();


export const AuthProvider = ({children})=>{
       
    
     

    const [user,setUser]=useState(null)



     useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/getuser`,{withCredentials:true});
        setUser(res.data.user);
      } catch (err) {
        console.log(err.message)
        setUser(null);
      } 
    };

    fetchUser();
  }, []);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )

}