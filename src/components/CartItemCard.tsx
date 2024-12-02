import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, Divider, Button, Grid } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const CartItemCard = ({ item, quantity }) => {
    const { cartItems, totalPrice, setCartContext } = useContext(CartContext);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const removeItemFromCart = () => {
        // create a new array with the item removed
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.item.name !== item.name);
        
        // calculate the new total price
        const newTotalPrice = updatedCartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartContext(updatedCartItems, newTotalPrice);
    };

    const editItem = () => [
        // TODO: implement edit functionality -> maybe navigate to a page or open a modal where we can edit the cartItem object
    ];

    const changeItemQuantity = (newQuantity) => {
        console.log(newQuantity);
        // create a new array with the item updated
        const updatedCartItems = cartItems.map(cartItem => cartItem.item.name === item.name ? { ...cartItem, quantity: newQuantity } : cartItem);
    
        // calculate the new total price
        const newTotalPrice = updatedCartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

        // update the cart context
        setCartContext(updatedCartItems, newTotalPrice);
    }

    return (
        <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2 }}>
        <Grid container justifyContent="space-between">
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="h6">{quantity} x ${item.price.toFixed(2)}</Typography>
        </Grid>
        { expanded && (
            <>
                <Divider variant="middle" sx={{ marginY: 1 }} />
                <Typography variant="body1">Customizations:</Typography>
                {item.customizations && item.customizations.map((category, index) => (
                    <div key={index}>
                    <Typography variant="body2">{category.label}:</Typography>
                    {category.customizations.map((option, idx) => (
                        <Typography key={idx} variant="body2" sx={{ marginLeft: 2 }}>
                        - {option.name} (+${option.price.toFixed(2)})
                        </Typography>
                    ))}
                    </div>
                ))}
                <Divider variant="middle" sx={{ marginY: 1 }} />
                <Typography variant="body1">Special Comments:</Typography>
            </>
        )}
        <Divider variant="middle" sx={{ marginY: 1 }} />
        <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="body1">
                    Quantity:
                    <Button onClick={() => changeItemQuantity(quantity - 1)} disabled={quantity <= 1}>
                        - 
                    </Button>     
                        {quantity}
                    <Button onClick={() => changeItemQuantity(quantity + 1)}>
                        +
                    </Button>
                </Typography>
            <div>
            <Button variant="outlined" size="small" sx={{ marginRight: 1 }} onClick={removeItemFromCart}>Remove</Button>
            <Button variant="outlined" size="small" sx={{ marginRight: 1 }} onClick={editItem}>Edit</Button>
            <Button variant="outlined" size="small" onClick={toggleExpanded}>{expanded ? 'Show Less' : 'Show More'}</Button>
            </div>
        </Grid>
        </Card>
    );
};

export default CartItemCard;