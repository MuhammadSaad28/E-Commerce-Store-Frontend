import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageNotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <h2>OOPs ! Page Not Found</h2>
      <Link to='/' className='but'>Go To The Main Page</Link>
    </Container>
  )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
min-height: 80vh;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
h1{
  font-size: 100px;
  font-weight: bold;
  color: #000;
}
h2{
  font-size: 30px;
  color: #000;
}
.but{
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover{
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
}
`

export default PageNotFound