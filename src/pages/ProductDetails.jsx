import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../components/context/CartContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { host } from '../APIs/ApiCalls'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const [cart, setCart] = useCart()
    const tostifyOption = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }





    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${host}/api/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getRelatedProducts(data?.product?._id, data?.product?.category?._id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    const getRelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${host}/api/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <div className="container-fluid">
                <div className="row container pt-2">
                    <div className="col-md-6">
                        <img src={`${host}/api/product/product-photo/${product._id}`} alt="product-photo" height={'400px'} width={'400px'} className='img img-responsive' />
                    </div>
                    <div className="col-md-6 text-center mt-4 details">
                        {/* <h1>Product Details</h1> */}
                        <h3>{product?.name}</h3>
                        <p style={{ wordWrap: 'break-word' }}>{product?.description}</p>
                        <p>Price: ${product?.price}</p>
                        <p>Quantity: {product?.quantity}</p>
                        <p>Category: {product?.category?.name}</p>
                        <button href="#" className='btn btn-secondary but' onClick={()=> {
                            setCart((prevCart) => [...prevCart, product]);
                            toast.success(`${product.name} added to cart`, tostifyOption)
                        }}>Add to Cart</button>
                    </div>
                </div>
                <div className="row mt-4 text-center">
                    <h1>Similar Products</h1>
                    <div className="d-flex flex-wrap text-center">
              {
                relatedProducts.length > 0 ? (
                relatedProducts.map(product => (
                  <>

                    <div className="card c mb-5" style={{ width: '15rem', height: '22rem' }}>
                      <img src={`${host}/api/product/product-photo/${product._id}`} className="card-img-top img i" alt={product.name} />
                      <div className="card-body cb">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0, 30)}</p>
                        <p className="card-text">Price: ${product.price}</p>
                        <div className='d-flex buts'>
                          <button href="#" className='btn btn-secondary but' onClick={()=> navigate(`/product/${product.slug}`)}>More Details</button>
                          <button href="#" className='btn btn-secondary but' onClick={()=> {
                            setCart((prevCart) => [...prevCart, product]);
                            toast.success(`${product.name} added to cart`, tostifyOption)
                        }}>Add to Cart</button>
                        </div>
                      </div>
                    </div>

                  </>
                ))
                ) : (
                  <div className="text-center m-4" style={{width:"100%"}}>
                    <h5>No Similar Products Found</h5>
                  </div>
                )
              }
            </div>
                </div>
            </div>

        </Container>
    )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
min-height: 80vh;
// background-color: #1c1c1c;
max-width: 100vw;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}


.c{
    margin: 10px;
    border: none;
      border-radius: 10px;
      box-shadow: 0 0 10px #000;
      transition: all 0.2s ease-in-out;
      &:hover{
        transform: scale(1.04);
      }
      margin-bottom: 20px;
     height: 420px !important;
  }
  .cb{
    background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
    // background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    height: 220px;
    
    // &:hover{
    //   transform: scale(1.1);
    // }
  }
  i{
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    width: 80%;
    height: 60%;
  }
  
  .buts{
    // justify-content: space-around;
    // align-items: center;
    // margin-top: 10px;
    // margin-bottom: 10px;
    width: 100%;
    // height: 100%;
    background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
    // background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    // margin-top: -100px;
    
  }
  .but{
    margin: 10px;
  }
  a{
    text-decoration: none;
    color: #000;
  }
  .i{
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    width: 100%;
    height: 180px !important;
  }
  .details{
    border: 1px solid black;
    padding: 40px;
    color: white;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 1rem;
 
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
  }
  
`

export default ProductDetails