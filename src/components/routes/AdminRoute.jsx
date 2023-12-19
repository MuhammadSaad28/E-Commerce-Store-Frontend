import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import {host} from "../../APIs/ApiCalls";
import {AdminRouteAPI} from "../../APIs/ApiCalls";

export default function AdminRoute(){
    const [ok,setOk] = useState(false)
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
       const authCheck = async ()=>{
           const res = await axios.get(`${host}/${AdminRouteAPI}`)
           if(res.data.ok){
            setOk(true)
           }else{
            setOk(false)
           }
        }
           if(auth?.token) authCheck()
           
       
    },[auth?.token])

    

    return ok ? <Outlet/> : <Spinner path="" message="true" /> 
}