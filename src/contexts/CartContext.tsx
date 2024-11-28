import React, {useState, useEffect} from 'react'
import CartItem from '../types/CartItem.ts'

interface CartContext
{
    cartItems: CartItem[] // just a FoodItem, but with an ID, and a quantity. 
    totalPrice: number,
}

export const CartContext = React.createContext<CartContext>({cartItems: [], totalPrice: 0});