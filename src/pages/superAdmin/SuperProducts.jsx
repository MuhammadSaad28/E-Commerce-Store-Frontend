import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import SuperAdminMenu from './SuperAdminMenu'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../components/context/Auth'
import { host } from '../../APIs/ApiCalls'

const SuperProducts = () => {

  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${host}/api/product/get-products`);
    //   const { data } = await axios.get(`http://localhost:2200/api/product/get-specific-products`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Container>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu/>
          </div>
          <div className="col-md-9 mt-4">
            <div className="text-center">
           <h1>All Products</h1>
           <div className="md-3 cd">
            {
              products.map(product => (
                <>
                <Link to={`/dashboard/super-admin/update-product/${product.slug}`}>
                <div className="card" style={{width: '15rem' , height:'22rem'}}>
  <img src={`${host}/api/product/product-photo/${product._id}`} className="card-img-top img i" alt={product.name} />
  <div className="card-body cb">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,28)}...</p>
    
  </div>
</div>
</Link>
</>
              ))
            }
           </div>
            </div>
          </div>
        </div>
        </div>
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
.cd{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .card{
    margin: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    &:hover{
      transform: scale(1.1);
    }
  }
}
a{
  text-decoration: none;
  color: #000;
}
.c{
  margin: 10px;
  border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    &:hover{
      transform: scale(1.1);
    }
}
.cb{
  background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
  // background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  transition: all 0.5s ease-in-out;
  // &:hover{
  //   transform: scale(1.1);
  // }
}
.i{
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  transition: all 0.5s ease-in-out;
  width: 100%;
  height: 60%;
}
`
export default SuperProducts