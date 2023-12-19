import { useState , useEffect , useContext , createContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
       let existingCart = localStorage.getItem('cart');
       if(existingCart){
           existingCart = JSON.parse(existingCart);
           setCart(existingCart);
       }
    }, []);  

    return (
        <CartContext.Provider value={[ cart, setCart ]}>
            {children}
        </CartContext.Provider>
    )
};

const useCart = () => useContext(CartContext);

export { useCart,CartProvider }; 