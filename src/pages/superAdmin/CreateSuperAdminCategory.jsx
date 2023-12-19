import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SuperAdminMenu from './SuperAdminMenu'
import { useAuth } from '../../components/context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import FormCategory from '../../components/FormCategory'
import { Button, Modal } from 'antd';
import { host } from '../../APIs/ApiCalls'




const CreateSuperAdminCategory = () => {
  const [name, setName] = useState('');
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const tostifyOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };


  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${host}/api/category/get-category`);
      if (data?.success) {
        setCategory(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${host}/api/category/create-super-category`, { name: name },);
      if (data.success) {
        toast.success(data.message, tostifyOption);
        setName('');
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${host}/api/category/update-super-category/${selected._id}`, { 
        name: updatedName
       });
      if (data.success) {
        toast.success(data.message, tostifyOption);
        setName('');
        setSelected('');
        setUpdatedName('');
        getAllCategories();
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }
  const handleDelete = async (id) => {
    
    try {
      const { data } = await axios.delete(`${host}/api/category/delete-super-category/${id}`, { 
        name: updatedName
       });
      if (data.success) {
        toast.success(data.message, tostifyOption);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, tostifyOption);
    }
  }


  return (
    <Container>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu />
          </div>
          <div className="col-md-9 mar flex">
            <div className="flex1">
              <h1>Manage Category</h1>
              <div className="p-3">
                <FormCategory handleSubmit={handleSubmit} value={name} setValue={setName} button="Submit" />
              </div>
            </div>
            <div className='w-75'>
              <table className="table tab">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className='btn btn-secondary ms-2' onClick={()=>{
                            {console.log(c)}
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                            }}>Edit</button>
                          <button className='btn btn-danger ms-2' onClick={()=>handleDelete(c._id)} >Delete</button>
                        </td>

                      </tr>
                    </>
                  )
                  )}

                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
        <FormCategory value={updatedName} setValue={setUpdatedName} handleSubmit={(e)=>handleUpdate(e)} button="Update" />
      </Modal>
      <ToastContainer />

    </Container>
  )
}

const Container = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1612835362596-4b0b2b1b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGJsb2NrJTIwY29sb3JmdWwlMjBjb3VudHJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
min-height: 80vh;
background-size: cover;
@media(max-width: 768px){
  min-height: 88vh;
}
@media(max-width: 500px){
  min-height: 87vh;
}
th{
  background-color: #000;
  color: #fff;
  border: none;

}
h1{
  // margin-left: 20px;
  
}
td{
  background-color: #a9a9a9;
  border-bottom: 1px solid #000;
}
.car{
    background-color: transparent;
}
.flex{
  display: flex;
  justify-content: space-between;
  @media(max-width: 500px){
    flex-direction: column;
  }
}
.flex1{
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.tab{
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  @media(max-width: 500px){
    width: 130%;
  }
}

`

export default CreateSuperAdminCategory