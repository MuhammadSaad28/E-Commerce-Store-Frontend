import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import styled from 'styled-components'

const SuperAdminMenu = () => {
  return (
    <Container>

<div className="list-group">
    <Link to="/dashboard/super-admin"><h2>Super Admin Panel</h2></Link>
  <NavLink to="/dashboard/super-admin/create-category" className="list-group-item list-group-item-action" activeClassName="active">Create Category</NavLink>
  <NavLink to="/dashboard/super-admin/create-product" className="list-group-item list-group-item-action" activeClassName="active">Create Product</NavLink>
  <NavLink to="/dashboard/super-admin/products" className="list-group-item list-group-item-action" activeClassName="active">Products</NavLink>
  <NavLink to="/dashboard/super-admin/manage-orders" className="list-group-item list-group-item-action" activeClassName="active">Manage Orders</NavLink>
  <NavLink to="/dashboard/super-admin/profile" className="list-group-item list-group-item-action" activeClassName="active">Profile</NavLink>
  <NavLink to="/dashboard/super-admin/orders" className="list-group-item list-group-item-action" activeClassName="active">Orders</NavLink>
  <NavLink to="/dashboard/super-admin/sellers" className="list-group-item list-group-item-action" activeClassName="active">Sellers</NavLink>
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

export default SuperAdminMenu