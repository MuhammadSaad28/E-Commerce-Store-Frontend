import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../components/context/CartContext";
import { useAuth } from "../components/context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { host } from "../APIs/ApiCalls";


const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const RemoveCartItem = (id) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${host}/api/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // useEffect(() => {
  //   console.log("Client Token:", clientToken);
  // }, [clientToken]);

  const handlePayment = async () => {
    try{
      setLoading(true)
       const {nonce} = await instance.requestPaymentMethod()
       const {data} = await axios.post(`${host}/api/product/braintree/payment`, {
       nonce,
       cart
    }
       )
       setLoading(false)
       localStorage.removeItem("cart")
       toast.success('Payment Successfull', tostifyOption)
       setCart([])
       if(auth?.user?.role === 1){
         navigate('/dashboard/admin/orders')
       }
       if(auth?.user?.role === 0){
        navigate('/dashboard/user/orders')
      }
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  };

  return (
    <Container className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2  mb-1 hello">
              {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
            </h1>
            <h4 className="text-center cart-items-message">
              {cart?.length > 0
                ? `You have ${cart?.length} item(s) in your cart. ${
                    auth?.token ? "" : "Please Login to Checkout"
                  } `
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((product) => (
              <div className="row border-bottom py-3">
                <div className="col-md-3">
                  <img
                    src={`${host}/api/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="img-fluid i"
                  />
                </div>
                <div className="col-md-6">
                  <h5>{product?.name}</h5>
                  <p>{product?.description.substring(0, 30)}</p>
                  <h5>${product?.price}</h5>
                </div>
                {/* <div className="col-md-3">
                    <h5>${product?.price}</h5>
                  </div> */}
                <div className="col-md-3">
                  <button
                    className="btn btn-danger bt"
                    onClick={() => RemoveCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3 mt-4">
                  <hr />
                  <h3>Current Address</h3>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
                <hr />
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2 mb-4">
             
              {
                !clientToken || !cart?.length ? ("") : (
                  <>
  <DropIn
    options={{
      authorization: clientToken,
    }}
    onInstance={(instance) => setInstance(instance)}
  />
  <button className="btn btn-secondary" onClick={handlePayment} 
   disabled={loading || !instance || !auth?.user?.address}
  >
                {loading ? 'Processing....' : 'Make Payment'}
              </button>
              </>
                )
              }
             
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80");
  min-height: 80vh;
  max-width: 100vw;
  @media (max-width: 768px) {
    min-height: 88vh;
  }
  @media (max-width: 500px) {
    min-height: 87vh;
  }
  .cart-items-message {
    color: #000;
    font-weight: 500;
  }
  .i {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 10px;
  }
  .bt {
    margin: 45px 0;
  }
  .hello{
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
  }
`;

export default Cart;
