import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import {  PrivateRouteAPI, host } from "../../APIs/ApiCalls";


export default function PrivateRoute(){
    const [ok,setOk] = useState(false)
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
       const authCheck = async ()=>{
           const res = await axios.get(`${host}/${PrivateRouteAPI}`)
           if(res.data.ok){
            setOk(true)
           }else{
            setOk(false)
           }
        }
           if(auth?.token) authCheck()
           
       
    },[auth?.token])


    return ok ? <Outlet/> : <Spinner/> 
}