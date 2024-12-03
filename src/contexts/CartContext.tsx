import React, {useState, useEffect} from 'react'
import CartItem from '../types/CartItem.ts'
import {v4 as uuid, v4} from 'uuid';
interface CartContextProps
{
    cartItems: CartItem[] // just a FoodItem, but with an ID, and a quantity. 
    totalPrice: number,
    setCartContext: (items: CartItem[], price: number) => void // unfortunately we have to re-add the entire cart. 
    addToCart: (item: CartItem) => void,
}

// React only uses this default context if the component is not wrapped in a context provider:
// <CartContext.Provider value={...}> </CartContext.Provider>
export const CartContext = React.createContext<CartContextProps>(
    {
        cartItems: [],
        totalPrice: 0,
        setCartContext: (_items: CartItem[]) => {console.error("Not implemented")},
        addToCart: (_item: CartItem) => {console.error("Function not implemented")},
    } // avoids using a "null" default context
);


export const CartProvider = ({children}:{children: React.ReactNode}) =>
{
    const [cart, setCart] = useState<CartItem[]>([]);
    const [price, setPrice] = useState(0);
    const addToCart = (item: CartItem) =>
    {
        item.id = v4();
        setCart((prevCart)=> [...prevCart, item]);
        setPrice((prev) => prev + item.price);
    }
    const setCartContext = (items: CartItem[], price: number)=>
    {
        setPrice(price);
        setCart(items); // replace the whole thing
    }
    return (
        <CartContext.Provider value={{cartItems: cart, totalPrice: price, setCartContext, addToCart}}>
            {children}
        </CartContext.Provider>
    );
}
