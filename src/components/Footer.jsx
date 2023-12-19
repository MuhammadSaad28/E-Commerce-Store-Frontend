import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <h4>All Rights Reserved &copy; Muhammad Saad</h4>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
  padding: 1rem;
  background: #000;
  color: #fff;
  h4{
    color: #fff;
  }
  `

export default Footer

