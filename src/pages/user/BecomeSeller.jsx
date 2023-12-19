import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useAuth } from '../../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../APIs/ApiCalls'

const BecomeSeller = () => {
    const [auth, setAuth] = useAuth();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
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
    const { email} = auth.user
    
    setEmail(email)
    
    
    }
  }, [auth.user])


  const HandleSubmit = async (e) => {
    e.preventDefault();
     try{
    const { data } = await axios.put(`${host}/api/auth/user-status`, { name, username, email, address })
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
        <div className="col-md-1 mt-5"></div>

        <div className="col-md-4 mt-5 user-message">
        <p>Ready to take your online presence to the next level?</p> <p> Become a seller on our platform by updating your name to your unique shop name! </p> <p> By doing so, you unlock powerful features to showcase and sell your products.</p> <p> Elevate your business and connect with more customers. </p> <p>Update your name to your shop name now and start your journey as a seller!</p>

          </div>
         
          
          <div className="col-md-6 mt-4">
            <h1 className='mb-4'>User Profile</h1>
            <div className="registerform pt-3 ">

              <form onSubmit={HandleSubmit}>
                <div className="mb-3">

                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Shop Name' value={name} onChange={e => setName(e.target.value)} required />

                </div>
                <div className="mb-3">

                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Username That Matches ShopName' value={username} onChange={e => setUsername(e.target.value)} required />

                </div>
                <div className="mb-3">

                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} disabled />

                </div>

                <div className="mb-3">

<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Business Address' value={address} onChange={e => setAddress(e.target.value)} required />

</div>

                <button type="submit" className="btn btn-secondary">Become a Seller</button>
              </form>
            </div>

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
max-width: 100vw;
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
  margin-right: 60px;
  
 
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
}
`

export default BecomeSeller