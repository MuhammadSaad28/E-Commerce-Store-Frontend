import React from 'react'
import styled from 'styled-components'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { host } from '../APIs/ApiCalls'

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword]  = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [answer, setAnswer] = useState('')
  const [address, setAddress] = useState('')
  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const HandleValidation = () => {
    if(name === '' || email === '' || password === '' || confirmPassword === '' || username === '' || answer === ''){
      toast.error('All Fields Are Required',tostifyOption)
      return false
    }
    else if(password !== confirmPassword){
      toast.error('Password and Confirm Password Should be Same',tostifyOption)
      return false
    }
    else if(username.length < 3){
      toast.error('Username Must Be Atleast 3 Characters Long',tostifyOption)
      return false
    }
    else if(password.length < 8){
      toast.error('Password Must Be Atleast 8 Characters Long',tostifyOption)
      return false
    }
    else if(answer.length < 3){
      toast.error('Answer Must Be Atleast 3 Characters Long',tostifyOption)
      return false
    }
    else if(address === ''){
      toast.error('Address Is Required',tostifyOption)
      return false
    }
    else{
      return true
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(HandleValidation()){
      const {data} = await axios.post(`${host}/api/auth/register`,{name,username,email,password,answer, address})
    if(data.success){
      toast.success(data.message,tostifyOption)
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setAnswer('')
      setAddress('')
      navigate('/login')
    }else{
      toast.error(data.message,tostifyOption)
    }}
  }
  return (
    <Container>
      <div className="registerform pt-4">
      
      <form onSubmit={HandleSubmit}>
        <h3>Register</h3>
      <div className="mb-2">
    
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Full Name' value={name} onChange={e=>setName(e.target.value)}  />
    
  </div>
      <div className="mb-2">
    
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
    
  </div>
  <div className="mb-2">
    
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Address' value={email} onChange={e=>setEmail(e.target.value)} />
    
  </div>
  <div className="mb-2">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
  </div>
  <div className="mb-2">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Confirm Password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
  </div>

  <div className="mb-2">
    
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Address' value={address} onChange={e=>setAddress(e.target.value)}  />
    
  </div>
  <div className="mb-2">
    
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder='What is Your Favourite Food?' value={answer} onChange={e=>setAnswer(e.target.value)} />
  </div>
  
 
  <button type="submit" className="btn btn-secondary">Register</button>
  <p>Already Have An Account? <Link to='/login'><span>Login</span></Link></p>
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
// background-color: #1c1c1c;  
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
.registerform{
  background-color: #f2f2f2;
  width: 30vw;
  height: 75vh;
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
      text-decoration: none;'
    }
   
  }
 
}
`

export default Register