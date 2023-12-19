import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { host } from '../APIs/ApiCalls'

const CategoryProduct = () => {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${host}/api/product/product-category/${slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductsByCategory()
    }, [slug])


    return (
        <Container className='container-fluid'>
                {loading ? <Spinner /> : (
            <div className="container">
                <div className="text-center pt-4">
                    <h2>Category - {category?.name}</h2>
                    <h4>{products?.length} Product(s) Found</h4>
                </div>



                    <div className="d-flex flex-wrap mt-4">
                        {
                            products.map(product => (
                                <>

                                    <div className="card c" style={{ width: '15rem', height: '22rem' }}>
                                        <img src={`${host}/api/product/product-photo/${product._id}`} className="card-img-top img i" alt={product.name} />
                                        <div className="card-body cb">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description.substring(0, 30)}</p>
                                            <p className="card-text">Price: $ {product.price}</p>
                                            <div className='d-flex buts'>
                                                <button href="#" className='btn btn-secondary but' onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                                <button href="#" className='btn btn-secondary but'>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            ))
                        }
                    </div>

            </div>
                )}
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
     height: 200% !important;
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
`

export default CategoryProduct