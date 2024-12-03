import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, Divider, Button, Grid2, IconButton } from '@mui/material';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../types/CartItem';
import FoodItem from '../types/FoodItem';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useNavigate } from 'react-router-dom';
interface CartItemCardProps
{
    cartItem: CartItem,
    handleRemoveItem: (itemID: string) => void,
    handleChangeQuantity: (itemID: string, updatedQuantity: number) => void
}

const CartItemCard = ({cartItem, handleRemoveItem, handleChangeQuantity}:CartItemCardProps) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const removeItemFromCart = () => {
        console.log("Removing item");
        handleRemoveItem(cartItem.id);
    };

    const handleIncrease = ()=>
    {
        handleChangeQuantity(cartItem.id, cartItem.quantity + 1);
    }
    const handleDecrease = () =>
    {
        handleChangeQuantity(cartItem.id, cartItem.quantity - 1);
    }
  
    const editItem = () => [
        navigate(`/cart/edit?id=${encodeURIComponent(cartItem.id)}`)
    ];

    return (
        <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2 }}>
        <Grid2 container justifyContent="space-between">
            <Typography variant="h6">{cartItem.item.name}</Typography>
            <Typography variant="h6">{cartItem.quantity} ⨉ ${cartItem.price.toFixed(2)}</Typography>
        </Grid2>
        { expanded && (
            <>
                <Divider variant="middle" sx={{ marginY: 1 }} />
                <Typography variant="body1">Customizations:</Typography>
                {cartItem.item.customizations && Object.values(cartItem.item.customizations).map((category, index) => (
                    <React.Fragment key={index}>
                    <Typography variant="body2">{category.label}:</Typography>
                    {Object.entries(category.options).map(([key, option], idx) => {

                        if(option.selected)
                        {
                            return (<Typography key={idx} sx={{ marginLeft: 2 }}>
                        - {key} (+$ {option.price.toFixed(2)})
                        </Typography>)
                        }
                        return (<React.Fragment key={idx}></React.Fragment>)
                    })}
                    </React.Fragment>
                ))}
                <Divider variant="middle" sx={{ marginY: 1 }} />
                <Typography variant="body1">Special Comments:</Typography>
            </>
        )}
        <Divider variant="middle" sx={{ marginY: 1 }} />
        <Grid2 container justifyContent="space-between" alignItems="center">
            <Typography variant="body1">
                    Quantity:
                    <IconButton size='large' disabled={cartItem.quantity <= 1} onClick={handleDecrease}>
                        <RemoveIcon fontSize='large'/>
                    </IconButton>
                    <Typography sx={{fontSize: 20, ml: 3, mr: 3, fontWeight: 500}}>{cartItem.quantity}</Typography>
                    <IconButton size='large' disabled={cartItem.quantity >= 10} onClick={handleIncrease}>
                            <AddIcon fontSize='large'/>
                    </IconButton>
                </Typography>
            <React.Fragment>
            <Button variant="outlined" size="small" sx={{ marginRight: 1 }} onClick={removeItemFromCart}>Remove</Button>
            <Button variant="outlined" size="small" sx={{ marginRight: 1 }} onClick={editItem}>Edit</Button>
            <Button variant="outlined" size="small" onClick={toggleExpanded}>{expanded ? 'Show Less' : 'Show More'}</Button>
            </React.Fragment>
        </Grid2>
        </Card>
    );
};

export default CartItemCard;