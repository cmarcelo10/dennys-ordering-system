import React, { useContext, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { Box, Button, Typography, ThemeProvider, Grid2, Breadcrumbs, IconButton, Stack} from '@mui/material';
import theme from '../styles/Theme';
import CartItemCard from '../components/CartItemCard';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../types/CartItem';
import Slamburger from '../types/Slamburger';
// dummy menu items for testing
import { HandheldsList } from '../types/MenuItems';
import FoodItem from '../types/FoodItem';
import { v4 } from 'uuid';
import { ArrowBackIosRounded } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';

const isStrictMode = ()=>
{
    return (function()
    {
         // @ts-ignore
        return !this;
    });
}
const CartPage = () => {
    const navigate = useNavigate();
    // set up cart context to get cart items
    const { cartItems, totalPrice, saveToCart, removeFromCart} = useContext(CartContext);
    function handleChangeQuantity(itemID: string, newQuantity: number)
    {
        const item = cartItems[itemID];
        if(item)
        {
            item.quantity = newQuantity;
            saveToCart(item);
        }
    }
    return (
      <ThemeProvider theme={theme}>
        <NavBar bottomLabel='Confirm & Place Order'>
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton sx={{pr: 3}} size="large" onClick={()=>navigate('/')}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}} expandText='false'>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>{/* Need to link this to the main menu... it's kind of annoying that */}
                    <Typography>
                        Review Order
                    </Typography>
                </Breadcrumbs>
            </Box>
          <Typography sx={{ paddingTop: 3, width: '100%' }} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>
            Review Order
          </Typography>
          <Box sx={{ paddingTop: 1, width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-around'}}>
            <Stack spacing={2} justifyContent={'space-around'}>
                {Object.values(cartItems).map((cartItem) => (
                    <CartItemCard key={cartItem.item.name + cartItem.id} cartItem={cartItem} handleChangeQuantity={handleChangeQuantity} handleRemoveItem={removeFromCart}/>
                ))}
            </Stack>
          </Box>
            <Typography sx={{ paddingTop: 2, width: '100%' }} variant='h5' textAlign="center">
            Total Price: ${totalPrice.toFixed(2)}
            </Typography>
        </NavBar>
      </ThemeProvider>
    );
  };
  
  export default CartPage;