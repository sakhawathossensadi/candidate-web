import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
  
export const  useRedirect = ()=> {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        
        if (!token) {
        navigate("/");
    }
    },[]);

}