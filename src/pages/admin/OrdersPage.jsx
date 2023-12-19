import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../components/context/Auth'

import axios from 'axios'
import moment from 'moment'
import { host } from '../../APIs/ApiCalls'

const OrdersPage = () => {
    const [auth,setAuth] = useAuth();
    const [orders,setOrders] = useState([]);
    

    const getOrders = async () => {
      try{
        const {data} = await axios.get(`${host}/api/auth/orders`)
        setOrders(data)
        console.log("orders:",data)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      if(auth?.token){
        getOrders()
      }
    },[auth?.token])

    
  

  return (
    <Container>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 mt-4">
                    <h1 className='text-center'>All Orders</h1>
                    <div className='mb-3'>
                    {
                      orders.map((order,index)=>{
                        return(
                          <div className="border shadow mb-3">
                            <table className="table">
                              <thead className='text-center'>
                                <tr>
                                  <th scope='col'>#</th>
                                  <th scope='col'>Status</th>
                                  <th scope='col'>Buyer</th>
                                  <th scope='col'>Date</th>
                                  <th scope='col'>Payment</th>
                                  <th scope='col'>Quantity</th>
                                </tr>
                              </thead>
                              <tbody className='text-center'>
                                <tr>
                                   <td>{index+1}</td>
                                   <td>{order?.status}</td>
                                   <td>{order?.buyer?.name}</td>
                                   <td>{moment(order?.createdAt).fromNow()}</td>
                                   <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                   <td>{order?.products?.length}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="container">
                            {order?.products?.map((product) => (
              <div className="row border-bottom pb-2 itemss">
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
               
               
              </div>
            ))}
                            </div>
                          </div>
                        )
                      })
                    }
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
.car{
    background-color: transparent;
}
.itemss{
  height: 110px;
  overflow: hidden;
}
.i{
  height: 100px;
  width: 100px;
  padding: 10px 0;
}
`

export default OrdersPage