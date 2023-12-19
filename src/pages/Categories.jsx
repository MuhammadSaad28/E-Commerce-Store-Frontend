import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories = useCategory();
  return (
    <Container className='container-fluid'>

        <div className="container">
             <div className="row bootstrap-row">
                {categories?.map(category => (
                <div className="col-md-6 buttons">
                    <button className='btn btn-secondary'>
                        <Link to={`/category/${category.slug}`} className='btn btn-secondary'>{category.name}</Link>
                    </button>
                </div>
               ))}
             </div>
        </div>
        
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
.bootstrap-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
    padding-top: 20px;
}
.buttons {
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 10px;
}
`

export default Categories