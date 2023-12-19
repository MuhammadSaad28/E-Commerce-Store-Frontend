import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import SuperAdminMenu from './SuperAdminMenu'
import axios from 'axios'
import { host } from '../../APIs/ApiCalls'

const SuperSellers = () => {
     
    const [sellers,setSellers] = useState([])
    const [loading,setLoading] = useState(false)


    const getSellers = async () => {
        try{
            setLoading(true)
            const {data} = await axios.get(`${host}/api/auth/get-all-sellers`)
            setSellers(data)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSellers()
    },[])

    const handleDelete = async (id) => {
        try{
            console.log(id)
           const {data} = await axios.delete(`${host}/api/auth/delete-user/${id}`)
           getSellers();
        }catch(err){
            console.log(err)
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
                <h1 className='text-center'>All Sellers</h1>
                <div className='mb-3 tab'>
                <table className="table">
                    <thead className='text-center'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Seller</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                   
                    <tbody className='text-center'> 
                            {sellers.map((seller,index)  => {
                                return(
                                    <>
                                     
                                     <tr>
                                    <td>{index+1}</td>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.username}</td>
                                    <td>{seller.address}</td>
                                    <td><button className='btn btn-danger' onClick={()=>handleDelete(seller._id)} >Delete User</button></td>
                                    </tr>
                                   
                                    </>
                                )
                            })}
                       
                            </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>

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
.tab{
    overflow-x: scroll !important;
}
`

export default SuperSellers