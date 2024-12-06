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
    appliedDiscounts: string[],
    setCartContext: (items: Cart, price: number) => void // unfortunately we have to re-add the entire cart. 
    addToCart: (item: CartItem) => void,
    removeFromCart: (itemID: string) => void,
    saveToCart: (item: CartItem) => void,
    setCartPrice: (price: number) => void,
    applyDiscount: (itemName: string) => void,
}

// React only uses this default context if the component is not wrapped in a context provider:
// <CartContext.Provider value={...}> </CartContext.Provider>
export const CartContext = React.createContext<CartContextProps>(
    {
        cartItems: {},
        totalPrice: 0,
        appliedDiscounts: [],
        setCartContext: (_items: Cart, _price: number) => {console.error("Not implemented")},
        addToCart: (_item: CartItem) => {console.error("Function not implemented")},
        removeFromCart: (_itemID: string) => {console.error("Function not implemented")},
        saveToCart: (_item: CartItem) => {console.error("Function not implemented")},
        setCartPrice: (_price: number) => {console.error("Function not implemented")},
        applyDiscount: (_itemName: string) => {console.error("Function not implemented")},
    } // avoids using a "null" default context
);

export function verboseLogCart(cart: Cart)
{

    for (const key in cart)
    {
        if(cart.hasOwnProperty(key))
        {
            console.log("${key}: ${cart[key]}");
        }
    }
}

export const CartProvider = ({children}:{children: React.ReactNode}) =>
{
    const initialized = React.useRef(false);
    const [cart, setCart] = useState<Cart>({});
    const [price, setPrice] = useState(0);
    const [appliedDiscounts, setAppliedDiscounts] = useState<string[]>([]);

    const saveToCart = (item: CartItem) =>
    {
        let newPrice = 0;
        Object.values(cart).reduce((total, value)=>(total+=value.price * value.quantity), 0);
        setPrice(newPrice);
        console.log(item);
        setCart((prev)=>({...prev, [item.id]:item}));
    };
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
            console.error('WARNING: No item with the id ${itemID} exists in the cart. Nothing was deleted');
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

    const applyDiscount = (itemName: string) => {
        // Checks if discount is already applied
        if (appliedDiscounts.includes(itemName)) {
            return;
        }
        setAppliedDiscounts((prev) => [...prev, itemName]);
    
        // Updates the cart and applies a one-time 50% discount
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
    
            for (const itemID in updatedCart) {
                if (updatedCart[itemID].item.name === itemName) {
                    const cartItem = updatedCart[itemID];
                    if (!cartItem.originalPrice) {
                        cartItem.originalPrice = cartItem.price; 
                    }
                    cartItem.price = cartItem.originalPrice / 2; // Halves the price of one item
                    break;
                }
            }
    
            return updatedCart;
        });
    
        // Recalculates the total price
        recalculateTotalPrice();
    };

    const recalculateTotalPrice = () => {
        const newTotal = Object.values(cart).reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,0);
        setPrice(newTotal);
    };

    useEffect(() => {
        recalculateTotalPrice(); // Recalculates the total whenever the cart updates. Needed for Discount to work
    }, [cart]);
    
    return (
        <CartContext.Provider value={{cartItems: cart, totalPrice: price, appliedDiscounts, setCartContext, setCartPrice, addToCart, removeFromCart, saveToCart, applyDiscount}}>
            {children}
        </CartContext.Provider>
    );
}