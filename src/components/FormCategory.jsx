import React, { useState } from 'react'
import styled from 'styled-components'

const FormCategory = ({handleSubmit,value,setValue,button}) => {
    
  return (
    <Container>
    
    <form onSubmit={handleSubmit}>
  <div className="mb-3 w-25 in">
    
    <input type="text" className="form-control" placeholder='Enter New Category' value={value} onChange={e=>setValue(e.target.value)} />
    
  </div>
  
  <button type="submit" className="btn btn-secondary">{button}</button>
</form>



    </Container>
  )
}

const Container = styled.div`
input{
    background-color: #a9a9a9;
    // border: 1px solid #000;
    width: 340%;
    outline: none;
    &:focus{
        background-color: #a9a9a9;
        outline: none;
    }
    @media(max-width: 500px){
        width: 350%;
    }
}
`

export default FormCategory