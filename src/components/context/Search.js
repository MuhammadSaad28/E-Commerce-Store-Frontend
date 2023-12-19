import { useState , useEffect , useContext , createContext } from 'react';
import axios from 'axios';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState({
        keyword: "",
        results: []
    });
    // default axios

    
    

    return (
        <SearchContext.Provider value={[ search, setSearch ]}>
            {children}
        </SearchContext.Provider>
    )
};

const useSearch = () => useContext(SearchContext);

export { useSearch,SearchProvider }; 