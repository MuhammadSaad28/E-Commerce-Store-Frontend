import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import SearchInput from './SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../components/context/CartContext';
import { Badge } from 'antd';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const HandleLogout = () => {
    localStorage.removeItem('auth')
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
  }
  return (

    <Container>


      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand" href="#">🛒 SnapCart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nim ">
              <li className="nav-item ni">
                <NavLink to='/' className="nav-link ">Home</NavLink>
              </li>
              <li className="nav-item dropdown ni">
                <Link to={"/categories"} className="nav-link dropdown-toggle"  data-bs-toggle="dropdown" >
                  Categories
                </Link>
                  <ul className="dropdown-menu ni">
                    <Link to={"/categories"} className="dropdown-item" >All Categories</Link>
                {categories?.map(category => (
                    <li><Link to={`/category/${category.slug}`} className="dropdown-item" >{category.name}</Link>
                    </li>
                    ))}
                  </ul>
              </li>

              {!auth.user ? <>
                <li className="nav-item">
                  <NavLink to='/register' className="nav-link "  >Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/login' className="nav-link "  >Login</NavLink>
                </li>
              </> : <>

                <li className="nav-item dropdown ni">
                  <NavLink className="nav-link dropdown-toggle non-active"  role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {auth?.user?.name}
                  </NavLink>
                  
                  <ul className="dropdown-menu dm">
                    <li><NavLink to={`/dashboard/${auth?.user?.role === 2 ? "super-admin" : auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                    {auth?.user?.role === 0 && <li><NavLink to={`/dashboard/user/become-a-seller`} className="dropdown-item">Become a Seller</NavLink></li>}
                    
                    <li>   <NavLink onClick={HandleLogout} to='/login' className="dropdown-item">Logout</NavLink></li>

                  </ul>
                </li>





              </>}



              <li className="nav-item">
                <Badge count={cart?.length}  className='badg'>
                <NavLink to='/cart' className="nav-link ">Cart</NavLink>
                </Badge>
              </li>


            </ul>

          </div>
        </div>
      </nav>

    </Container>
  )
}

const Container = styled.div`
position: sticky;
top: 0;
left: 0;
z-index: 999;
.badg{
  // background-color: #f44336;
  color: white;
  font-size: 10px;
  // padding: 0 8px;
  margin-right: 10px;
  border-radius: 50%;
  // position: absolute;
  // top: 0;
  // right: 0;
  font-weight: 500;
  font-size: 16px;
  margin-top: 4px;
}
.dm{
  
  transform: translateX(-30px);
  @media (max-width: 500px) {
    transform: translateX(0px);
  }
}

// .nim{
//   padding: 0 30px;
// }
`

export default Header