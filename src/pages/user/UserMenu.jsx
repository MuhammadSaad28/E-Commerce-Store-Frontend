import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import styled from 'styled-components'

const UserMenu = () => {
  return (
    <Container>

<div className="list-group">
    <Link to="/dashboard/user"><h2>User Panel</h2></Link>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" activeClassName="active">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action" activeClassName="active">Orders</NavLink>
  
</div>


    </Container>
  )
}

const Container = styled.div`
   margin-top: 20px;
   text-align: center;
   .list-group{
    Link{
      text-decoration: none !important;
    }
    a{
      text-decoration: none !important;
    }
    h2{
      color: #000;
      font-weight: bold;
      text-decoration: none !important;
      
    }
    .list-group-item{
      background-color: #a9a9a9; 
      color: #212529;
      border: 1px solid #000;
      border-radius: 5%;
      // margin-bottom: 10px;
      &:focus{
          background-color: #000;
          color: #fff;
      }
      &.active {
        background-color: #000;
        color: #fff;
      }}
  }
`

export default UserMenu