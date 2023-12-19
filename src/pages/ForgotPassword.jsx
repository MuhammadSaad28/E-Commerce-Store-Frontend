import React from 'react'
import styled from 'styled-components'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { host } from '../APIs/ApiCalls'


const ForgotPassword = () => {
  const navigate = useNavigate();
  
 
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword]  = useState('')
  const [answer, setAnswer]  = useState('')
  
  
  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const HandleValidation = () => {
    if( email === '' || newPassword === '' || answer === '' ){
      toast.error('All Fields Are Required',tostifyOption)
      return false
    }
    else{
      return true
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try{
    if(HandleValidation()){
      const res = await axios.post(`${host}/api/auth/forgot-password`,
      {
        email , 
        answer,
        newPassword
        
    })
    if(res && res.data.success === false){
      toast.error(res.data.message,tostifyOption)
    }
    if(res &&  res.data.success === true){
      toast.success(res.data.message,tostifyOption)
      setEmail('')
      setNewPassword('')
      setAnswer('')
      navigate('/login')
    }}
  }catch(err){
    console.log(err)
   
  }}
  return (
    <Container>
      <div className="loginform">
      
      <form onSubmit={HandleSubmit}>
        <h3>Reset Password</h3>
      
  <div className="mb-3">
    
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Address' value={email} onChange={e=>setEmail(e.target.value)} />
    
  </div>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='What is Your Favourite Food?' value={answer} onChange={e=>setAnswer(e.target.value)} />
    
  </div>
  <div className="mb-3">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
  </div>
  
  
  <button type="submit" className="btn btn-secondary">Reset</button>
  <p>Don't Have An Account? <Link to='/register'><span>Register</span></Link></p>
</form>
</div>

<ToastContainer/>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 79vh;
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
.loginform{
  background-color: #f2f2f2;
  width: 30vw;
  height: 50vh;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: 768px){
    width: 60vw;
  }
  @media(max-width: 500px){
    width: 80vw;
 form{
  h3{
    color: #000;
    margin: 15px 0px;
  }
  width: 80%;
  
  
  p{
    margin-top: 10px;
    color: #000;
    font-size: 15px;
    text-decoration: none;
    span{
      color: #000;
      font-weight: bold;
      text-decoration: none;
    }
   
  }
 
}
`

export default ForgotPassword