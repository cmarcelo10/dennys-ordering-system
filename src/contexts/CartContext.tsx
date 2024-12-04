import React, {useState, useEffect} from 'react'
import CartItem from '../types/CartItem.ts'
import {v4 as uuid, v4, v5} from 'uuid';
export type {default} from '../types/CartItem.ts';

export interface Cart
{
    [key: string]: CartItem,
}
interface CartContextProps
{
    cartItems: Cart // just a FoodItem, but with an ID, and a quantity. 
    totalPrice: number,
    setCartContext: (items: Cart, price: number) => void // unfortunately we have to re-add the entire cart. 
    addToCart: (item: CartItem) => void,
    removeFromCart: (itemID: string) => void,
    saveToCart: (item: CartItem) => void,
    setCartPrice: (price: number) => void,
}

// React only uses this default context if the component is not wrapped in a context provider:
// <CartContext.Provider value={...}> </CartContext.Provider>
export const CartContext = React.createContext<CartContextProps>(
    {
        cartItems: {},
        totalPrice: 0,
        setCartContext: (_items: Cart, _price: number) => {console.error("Not implemented")},
        addToCart: (_item: CartItem) => {console.error("Function not implemented")},
        removeFromCart: (_itemID: string) => {console.error("Function not implemented")},
        saveToCart: (_item: CartItem) => {console.error("Function not implemented")},
        setCartPrice: (_price: number) => {console.error("Function not implemented")},
    } // avoids using a "null" default context
);

export function verboseLogCart(cart: Cart)
{

    for (const key in cart)
    {
        if(cart.hasOwnProperty(key))
        {
            console.log(`${key}: ${cart[key]}`);
        }
    }
}

export const CartProvider = ({children}:{children: React.ReactNode}) =>
{
    const initialized = React.useRef(false);
    const [cart, setCart] = useState<Cart>({});
    const [price, setPrice] = useState(0);

    const saveToCart = (item: CartItem) =>
    {
        let newPrice = 0;
        Object.entries(cart).forEach(([key, value])=>{
            console.log(`${key}: $ ${value.price}`);
            newPrice += value.price * value.quantity
            console.log(`New Price: $ ${newPrice}`);
        });
        setPrice(newPrice);
        console.log(item);
        setCart((prev)=>{
            prev[item.id] = item;
            return prev;
        });
    }
    const removeFromCart = (itemID: string) =>
    {
        const doomedCartItem = cart[itemID];
        if(doomedCartItem)
        {
            const updatedCart = cart;
            delete updatedCart[itemID];
            setPrice((prev)=>(prev - doomedCartItem.price));
            setCart({...updatedCart});
        }
        else
        {
            console.error(`WARNING: No item with the id ${itemID} exists in the cart. Nothing was deleted`);
        }
    }
    const addToCart = (item: CartItem) =>
    {
        item.id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : v4();
        setCart((prevCart)=>({...prevCart, [item.id]:item}));
        setPrice((prev) => prev + item.price);
    }
    const setCartPrice = (price :number)=>
    {
        setPrice(price);
    }
    const setCartContext = (items: Cart, price: number)=>
    {
        setPrice(price);
        setCart(items); // replace the whole thing
    }
    return (
        <CartContext.Provider value={{cartItems: cart, totalPrice: price, setCartContext, setCartPrice, addToCart, removeFromCart, saveToCart}}>
            {children}
        </CartContext.Provider>
    );
}
