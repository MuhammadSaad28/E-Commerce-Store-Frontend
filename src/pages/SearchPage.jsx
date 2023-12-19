import React from 'react'
import { useSearch } from '../components/context/Search'
import styled from 'styled-components'
import img from './dashboard.png'
import { host } from '../APIs/ApiCalls'

const SearchPage = () => {
    const [search, setSearch] = useSearch();
  return (
    <Container>
       <img src={img} alt="SnapCart Banner" className='pic' />
      <div className="container-fluid">
    <div className='container'>
       <div className="text-center">
        <h1>Search Results</h1>
        <h6>{search?.results?.length < 1 ? "No Products Found" : `Found ${search?.results?.length}`}</h6>
        <div className="d-flex flex-wrap mt-4">
              {
                search.results.map(product => (
                  <>

                    <div className="card c" style={{ width: '15rem', height: '22rem' }}>
                      <img src={`${host}/api/product/product-photo/${product._id}`} className="card-img-top img i" alt={product.name} />
                      <div className="card-body cb">
                        <h5 className="card-title h5">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0, 30)}</p>
                        <p className="card-text">Price: {product.price}</p>
                        <div className='d-flex buts'>
                          <button href="#" className='btn btn-secondary but'>More Details</button>
                          <button href="#" className='btn btn-secondary but'>Add to Cart</button>
                        </div>
                      </div>
                    </div>

                  </>
                ))
              }
            </div>
       </div>
    </div>
    </div>
    </Container>
  )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
// background-color: #1c1c1c;
min-height: 80vh;
max-width: 100vw;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
.pic{
  width: 100%;
  height: 400px;
  object-fit: cover;
  opacity: 0.8;
}
h5{
  color: #ffffff;
}
.h5{
  color: black !important;
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
  height: 240px;
  
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

export default SearchPage