import React from 'react'
import { useSearch } from '../components/context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchInputAPI, host } from '../APIs/ApiCalls';

const SearchInput =  () => {
    const [search, setSearch] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.get(`${host}/${SearchInputAPI}/${search.keyword}`);
            setSearch({...search, results: data.results});
            navigate('/search');
        } catch (err) {
            console.log(err);
        }
       
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search.keyword} onChange={(e)=> setSearch({...search, keyword : e.target.value})} />
  <button className="btn btn-outline-secondary" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput