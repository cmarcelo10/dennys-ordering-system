import React, {useState, useEffect} from 'react'
import CartItem from '../types/CartItem.ts'

interface CartContextProps
{
    cartItems: CartItem[] // just a FoodItem, but with an ID, and a quantity. 
    totalPrice: number,
    setCartContext: (items: CartItem[], price: number) => void // unfortunately we have to re-add the entire cart. 
}

// React only uses this default context if the component is not wrapped in a context provider:
// <CartContext.Provider value={...}> </CartContext.Provider>
export const CartContext = React.createContext<CartContextProps>(
    {
        cartItems: [],
        totalPrice: 0,
        setCartContext: (_items: CartItem[], _price) => {console.log("Not implemented")}
    } // avoids using a "null" default context
);


export const CartProvider = ({children}:{children: React.ReactNode}) =>
{
    const [cart, setCart] = useState<CartItem[]>([]);
    const [price, setPrice] = useState(0);
    const setCartContext = (items: CartItem[], price: number)=>
    {
        setCart(items);
        setPrice(price);
    }
    return (
        <CartContext.Provider value={{cartItems: cart, totalPrice: price, setCartContext}}>
            {children}
        </CartContext.Provider>
    );
}
