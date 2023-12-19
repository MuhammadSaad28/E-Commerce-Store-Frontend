import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../components/context/Auth';
import { host } from '../APIs/ApiCalls';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const tostifyOption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleValidation = () => {
    if (email === '' || password === '') {
      toast.error('All Fields Are Required', tostifyOption);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const res = await axios.post(`${host}/api/auth/login`, {
          email,
          password,
        });
        if (res && res.data.success === false) {
          toast.error(res.data.message, tostifyOption);
        }
        if (res && res.data.success === true) {
          toast.success(res.data.message, tostifyOption);
          setEmail('');
          setPassword('');
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          navigate(location.state || '/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="loginform">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div type="button" className="forgotButton" onClick={() => navigate('/forgot-password')}>
              Forgot Password
            </div>
          </div>
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
          <p>
            Don't Have An Account? <Link to="/register"><span>Register</span></Link>
          </p>
        </form>
      </div>

      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 79vh;
  
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
  @media (max-width: 768px) {
    min-height: 88vh;
  }
  @media (max-width: 500px) {
    min-height: 87vh;
  }
  .loginform {
    background-color: #f2f2f2;
    width: 30vw;
    height: 50vh;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 60vw;
    }
    @media (max-width: 500px) {
      width: 80vw;
    }
    form {
      h3 {
        color: #000;
        margin: 15px 0px;
      }
      width: 80%;
      .forgotButton {
        background-color: transparent;
        border: none;
        color: #000;
        text-decoration: underline;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
      }

      p {
        margin-top: 10px;
        color: #000;
        font-size: 15px;
        text-decoration: none;
        span {
          color: #000;
          font-weight: bold;
          text-decoration: none;
        }
      }
    }
  }
`;

export default Login;
