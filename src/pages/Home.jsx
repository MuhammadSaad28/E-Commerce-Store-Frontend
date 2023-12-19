import React, { useState, useEffect } from "react";
import { useAuth } from "../components/context/Auth";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../components/context/CartContext";
import img from "./dashboard.png";
import { host } from "../APIs/ApiCalls";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      // const res = await axios.get('http://localhost:2200/api/product/get-products');
      const res = await axios.get(`${host}/api/product/product-list/${page}`);
      setLoading(false);
      // setProducts(res.data.products);
      //   const shuffledProducts = shuffleArray(res.data.products);
      // setProducts(shuffledProducts);
      const randomizedProducts = res.data.products.sort(
        () => Math.random() - 0.5
      );
      setProducts(randomizedProducts);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // const shuffleArray = (array) => {
  //   const shuffledArray = [...array];
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  //   }
  //   return shuffledArray;
  // }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length && radio.length) {
      getFilteredProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length && !radio.length) {
      getCategoryFilteredProducts();
    }
  }, [checked]);

  useEffect(() => {
    if (radio.length && !checked.length) {
      getPricesFilteredProducts();
    }
  }, [radio]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${host}/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  };

  useEffect(() => {
    getAllCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${host}/api/product/product-count`);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTotal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${host}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  const getFilteredProducts = async () => {
    try {
      let filterArgs = {};

      if (checked.length > 0) {
        filterArgs.checked = checked;
      }

      if (radio.length > 0) {
        filterArgs.radio = radio;
      }

      const { data } = await axios.post(
        `${host}/api/product/product-filters`,
        filterArgs
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryFilteredProducts = async () => {
    try {
      let filterArgs = {};
      if (checked.length > 0) {
        filterArgs.checked = checked;
      }
      const { data } = await axios.post(
        `${host}/api/product/product-category-filters`,
        filterArgs
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  const getPricesFilteredProducts = async () => {
    try {
      let filterArgs = {};
      if (radio.length > 0) {
        filterArgs.radio = radio;
      }
      const { data } = await axios.post(
        `${host}/api/product/product-price-filters`,
        filterArgs
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <title>SNAPCART</title>
      </Helmet> */}
      <img src={img} alt="SnapCart Banner" className="pic" />
      <div className="container-fluid">
        <div className="row pt-3">
          <div className="col-md-3">
            
            
              <h4 className="text-center mt-5">Filter By Category</h4>
              <div className="d-flex flex-column">
                {categories.map((category) => (
                  <>
                    <Checkbox
                      key={category._id}
                      onChange={(e) =>
                        handleFilter(e.target.checked, category._id)
                      }
                      className="checkbox"
                    >
                      {category.name}
                    </Checkbox>
                  </>
                ))}
              </div>
              <h4 className="text-center mt-4">Filter By Prices</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((price) => (
                    <div key={price._id}>
                      <Radio value={price.array} className="radio">
                        {price.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="products">
              <div className="d-flex flex-wrap">
                {products.map((product) => (
                  <>
                    <div
                      className="card c"
                      style={{ width: "15rem", height: "22rem" }}
                    >
                      <img
                        src={`${host}/api/product/product-photo/${product._id}`}
                        className="card-img-top img i"
                        alt={product.name}
                      />
                      <div className="card-body cb">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          {product.description.substring(0, 28)}...
                        </p>
                        <p className="card-text">Price: $ {product.price}</p>
                        <div className="d-flex buts">
                          <button
                            href="#"
                            className="btn btn-secondary but"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            href="#"
                            className="btn btn-secondary but"
                            onClick={() => {
                              setCart((prevCart) => [...prevCart, product]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                              );
                              toast.success(
                                `${product.name} added to cart`,
                                tostifyOption
                              );
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
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
  .pic {
    width: 100%;
    height: 400px;
    object-fit: cover;
    opacity: 0.8;
  }
  .products {
    width: 100%;
  }
  
  .c {
    margin: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.04);
    }
    margin-bottom: 20px;
    height: 200% !important;
    @media (max-width: 500px) {
      width: 80% !important;
      margin: 15px auto;
    }
  }
  .cb {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
      url("https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80");
    // background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    height: 240px;

    // &:hover{
    //   transform: scale(1.1);
    // }
  }
  i {
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    width: 80%;
    height: 60%;
  }
  .buts {
    // justify-content: space-around;
    // align-items: center;
    // margin-top: 10px;
    // margin-bottom: 10px;
    width: 100%;
    // height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
      url("https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80");
    // background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    // margin-top: -100px;
  }
  .but {
    margin: 10px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .i {
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    transition: all 0.5s ease-in-out;
    width: 100%;
    height: 180px !important;
  }
`;

// const Container = styled.div`
// background-color: #1c1c1c;
// color: #ffffff;
// min-height: 80vh;
// max-width: 100vw;
// padding: 20px;

// .c {
//   margin: 10px;
//   border: none;
//   border-radius: 10px;
//   box-shadow: 0 0 10px #000;
//   transition: all 0.5s ease-in-out;

//   &:hover {
//     transform: scale(1.1);
//   }
//   margin-bottom: 20px;
//   height: 200% !important;
// }
// h1,h2,h3,h4,h5,h6,p{
//   color: #ffffff;
// }
// .radio{
//   color: #ffffff;
// }
// .checkbox{
//   color: #ffffff;
// }
// .cb {
//   background-color: #2c2c2c;
//   border-radius: 10px;
//   box-shadow: 0 0 10px #000;
//   transition: all 0.5s ease-in-out;
//   height: 220px;
// }

// i {
//   border-radius: 10px;
//   box-shadow: 0 0 10px #000;
//   transition: all 0.5s ease-in-out;
//   width: 80%;
//   height: 60%;
// }

// .buts {
//   width: 100%;
//   background-color: #2c2c2c;
//   border-radius: 10px;
//   box-shadow: 0 0 10px #000;
//   transition: all 0.5s ease-in-out;
// }

// .but {
//   margin: 10px;
//   color: #ffffff;
// }

// a {
//   text-decoration: none;
//   color: #ffffff;
// }

// .i {
//   // border-radius: 10px;
//   box-shadow: 0 0 10px #000;
//   transition: all 0.5s ease-in-out;
//   width: 100%;
//   height: 180px !important;
// }
// `;

export default Home;
