import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import SuperAdminMenu from './SuperAdminMenu'
import { useNavigate,useParams } from 'react-router-dom'
import { useAuth } from '../../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Select } from 'antd'
import { host } from '../../APIs/ApiCalls'
const { Option } = Select;

const UpdateSuperProduct = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  // const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${host}/api/product/get-product/${params.slug}`);
     
        setName(data?.product?.name);
        setDescription(data?.product?.description);
        setId(data?.product?._id);
        setPrice(data?.product?.price);
        setCategory(data?.product?.category._id);
        setQuantity(data?.product?.quantity);
        setShipping(data?.product?.shipping);
       
    
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }
  

  useEffect(() => {
    getSingleProduct(); 
    
     //eslint-disable-next-line
  }, [])

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

  // photo && productData.append('photo', photo);
  const handleUpdate = async (e) => {
        e.preventDefault();
        try{
          setLoading(true);
          const productData = new FormData();
          productData.append('name', name);
          productData.append('description', description);
          productData.append('price', price);
          productData.append('quantity', quantity);
          productData.append('category', category);
          productData.append('shipping', shipping);
          console.log('Update Product Data:', Object.fromEntries(productData.entries()));
          const { data } = await axios.put(`${host}/api/product/update-super-product/${id}`, productData);
          console.log('Update Product Response:', data);
          if (data?.success) {
            toast.success("Product Updated Successfully");
            navigate("/dashboard/super-admin/products");
          } else {
            toast.error(data?.message);
          }
        }catch(error){
          console.log(error);
          toast.error(error.response.data.error, tostifyOption);
        }finally{
          setLoading(false);
        }
  }

  const handleDelete = async (e) => {

    try {
      setLoading(true);
      const { data } = await axios.delete(`${host}/api/product/delete-super-product/${id}`);
      console.log('Delete Product Response:', data);
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/super-admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-3">
          <SuperAdminMenu />
        </div>
        <div className="col-md-9 mt-4">
          <h1>Update Product</h1>
          <div className="m-1 w-75">
            <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3 select' onChange={(value) => setCategory(value)} value={category}>

              {categories?.map(c => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
            
            <div className="mb-3">
                <div className="text-center">
                  <img src={`${host}/api/product/product-photo/${id}`} alt="product-photo" height={'200px'} className='img img-responsive' />
                 
                </div>
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
              <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3 select' onChange={(value) => setShipping(value)} value={shipping ? "Yes" : "No"}>
                <Option value="1" className="option">Yes</Option>
                <Option value="0" className="option">No</Option>

              </Select>
            </div>
            <div className="mb-3">
              <button className='btn btn-secondary col-md-12 button' onClick={handleUpdate}>Update Product</button>
            </div>
            <div className="mb-3">
              <button className='btn btn-danger col-md-12 button' onClick={handleDelete}>Delete Product</button>
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

export default UpdateSuperProduct