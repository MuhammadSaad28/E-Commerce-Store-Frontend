import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { host } from '../../APIs/ApiCalls'


const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')

  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if(auth.user){
    const { email, name, username, password, address } = auth.user
    setName(name)
    setEmail(email)
    setUsername(username)
    setPassword(password)
    setAddress(address)
    }
  }, [auth.user])


  const HandleSubmit = async (e) => {
    e.preventDefault();
     try{
    const { data } = await axios.put(`${host}/api/auth/profile`, { name, username, email, address })
    if(data?.err){
      toast.error(data?.message, tostifyOption)
      
    }else{
      setAuth({ ...auth, user: data?.user })
      let ls = localStorage.getItem('auth');
      ls = JSON.parse(ls);
      ls.user = data?.user;
      localStorage.setItem('auth', JSON.stringify(ls));
      toast.success(data?.message, tostifyOption)
    }

     }catch(err){
      toast.error(err.response.data.message, tostifyOption)
     }
  }

  return (
    <Container>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-5 mt-4">
            <h1 className='mb-4'>Seller Profile</h1>
            <div className="registerform pt-3 ">

              <form onSubmit={HandleSubmit}>
                <div className="mb-3">

                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />

                </div>
                <div className="mb-3">

                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />

                </div>
                <div className="mb-3">

                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} disabled />

                </div>
                {/* <div className="mb-3">

                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </div> */}

                <div className="mb-3">

<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} />

</div>

                <button type="submit" className="btn btn-secondary">Update</button>
              </form>
            </div>

          </div>
          <div className="col-md-4 mt-5 user-message">
          <p>Welcome to your profile! Here, you can edit your personal information, update your details, and make your profile uniquely yours.</p>
      <p>Feel free to customize your profile settings, change your profile picture, and update any information you'd like to share.</p>
      <p>If you have any questions or need assistance, don't hesitate to reach out. Happy editing!</p>
          </div>

        </div>
      </div>
            <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
min-height: 80vh;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
.car{
    background-color: transparent;
}
input{
  background-color: #a7a7a7;
    border: none;
    border-bottom: 1px solid #fff;
    color: #000;
    font-size: 1.2rem;
    font-weight: 500;
    &:focus{
        outline: none;
        box-shadow: none;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        color: #000;
        font-size: 1.2rem;
        font-weight: 500;
    }
   
}
.user-message{
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 1rem;
 
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
}

`

export default AdminProfile