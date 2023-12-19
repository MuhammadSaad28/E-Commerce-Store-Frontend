import {useEffect,useState} from 'react'
import axios from 'axios'
import { UseCategoryAPI, host } from '../APIs/ApiCalls'

export default function useCategory(){
    const [categories,setCategories] = useState([])

    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${host}/${UseCategoryAPI}`)
            setCategories(data?.categories)
        } catch (error) {
            console.log(error)
        }
       
    }

    useEffect(() => {
        getCategories()
    },[])

  return categories
}

