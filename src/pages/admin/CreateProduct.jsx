import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdminMenu from './AdminMenu'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Select } from 'antd'
import { host } from '../../APIs/ApiCalls'
const { Option } = Select;

const CreateProduct = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState(false);

  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const navigate = useNavigate();

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
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  const handleCreate = async (e) => {
        e.preventDefault();
        try{
          const productData = new FormData();
          productData.append('name', name);
          productData.append('description', description);
          productData.append('price', price);
          productData.append('category', category);
          productData.append('quantity', quantity);
          productData.append('photo', photo);
          productData.append('shipping', shipping);
          const { data } = await axios.post(`${host}/api/product/create-product`, productData);
          console.log(data);
          if (data?.success) {
            toast.success(data?.message, tostifyOption);
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setQuantity('');
            setPhoto('');
            setShipping(false);
            navigate('/dashboard/admin/products')
          }else{
            toast.error(data?.message, tostifyOption);
            navigate('/dashboard/admin/products')
          }
        }catch(error){
          console.log(error);
          toast.error(error.response.data.error, tostifyOption);
        }
  }

  return (
    <Container>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-4">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3 select' onChange={(value) => setCategory(value)}>

                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className="mb-3">
                <label htmlFor="upload-images" className='btn btn-outline-secondary col-md-12 label'>
                  {photo ? photo.name : "Upload Image"}
                  <input type="file" name='photo' accept='image/*' id='upload-images' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className='img img-responsive' />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='Enter Product Name' className='form-control' onChange={e => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <textarea cols="84" rows="4" className='form-control textarea' value={description} placeholder='Enter Product Description' onChange={e => setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='Set Price' className='form-control' onChange={e => setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder='Set Quantity' className='form-control' onChange={e => setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3 select' onChange={(value) => setShipping(value)}>
                  <Option value="1" className="option">Yes</Option>
                  <Option value="0" className="option">No</Option>

                </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-secondary col-md-12 button' onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
min-height: 80vh;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
.car{
    background-color: transparent;
}
input{
    background-color: #a7a7a7;
    border: none;
    border-bottom: 1px solid #fff;
    color: #000;
    font-size: 1.2rem;
    font-weight: 500;
    &:focus{
        outline: none;
        box-shadow: none;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        color: #000;
        font-size: 1.2rem;
        font-weight: 500;
    }
   @media(max-width: 500px){
    width: 130%;
   }
  }
    .textarea{
      background-color: #a7a7a7;
      border: none;
      border-bottom: 1px solid #fff;
      color: #000;
      font-size: 1.2rem;
      font-weight: 500;
      &:focus{
          outline: none;
          box-shadow: none;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #fff;
          color: #000;
          font-size: 1.2rem;
          font-weight: 500;
      }
      @media(max-width: 500px){
        width: 130%;
      
      }
    }
    .select{
      background-color: #a7a7a7;
      border: none;
      border-bottom: 1px solid #fff;
      color: #fff;
      font-size: 1.2rem;
      font-weight: 500;
      &:focus{
          outline: none;
          box-shadow: none;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #fff;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 500;
      }
      @media(max-width: 500px){
        width: 130%;
      }
    }
    .option{
      background-color: #a7a7a7;
      border: none;
      border-bottom: 1px solid #fff;
      color: #fff;
      font-size: 1.2rem;
      font-weight: 500;
      &:focus{
          outline: none;
          box-shadow: none;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #fff;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 500;
      }
    }
    .label{
      @media(max-width: 500px){
        width: 130%;
      }
    }
    .button{
      @media(max-width: 500px){
        width: 130%;
      }
    }
}
`

export default CreateProduct