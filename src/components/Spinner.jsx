import React,{ useState , useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ({path = "login" , message}) => {
    const navigate = useNavigate();
    const [count,setCount] = useState(3);
    const location = useLocation();
    
    
    useEffect(() => {
         const interval = setInterval(() => {
             setCount((prev) => --prev)
         },1000)
            if(count === 0){
                navigate(`/${path}`,{
                    state: location.pathname
                })
            }
            return () => clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <Container>
        {message==="true" ? <h1>Redirecting You in {count}s</h1> : "" }
            
        <div className="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>

    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
min-height: 80vh;
h1{
    color: #000;
    font-size: 40px;
    // font-weight: bold;

}
@media(max-width: 768px){
    min-height: 88vh;
}
@media(max-width: 500px){
    min-height: 87vh;
}
`

export default Spinner