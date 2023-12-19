import React from 'react'
import styled from 'styled-components'
import SuperAdminMenu from './SuperAdminMenu'
import { useAuth } from '../../components/context/Auth'


const SuperAdminDashboard = () => {
    const [auth,setAuth] = useAuth();
  return (
    <Container>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3">
                    <SuperAdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3 m-5 car">
                        <h3>Super Admin Name: {auth?.user?.name}</h3>
                        <h3>Super Admin Email: {auth?.user?.email}</h3>
                        <h3>Super Admin Username: {auth?.user?.username}</h3>
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
`

export default SuperAdminDashboard