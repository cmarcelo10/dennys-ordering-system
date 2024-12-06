import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar/Navbar';
import { Box, Button, Typography, ThemeProvider, Grid2, Breadcrumbs, IconButton, Stack, Paper, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import theme from '../styles/Theme';
import CartItemCard from '../components/CartPage/CartItemCard';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../types/CartItem';
import Slamburger from '../types/Slamburger';
// dummy menu items for testing
import { HandheldsList } from '../types/HandheldsMenu';
import FoodItem from '../types/FoodItem';
import { v4 } from 'uuid';
import { ArrowBackIosRounded } from '@mui/icons-material';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import WindowDimensions from '../components/WindowDimensions';
import CheckoutDialog from '../components/CartPage/CheckoutDialog';
const isStrictMode = ()=>
{
    return (function()
    {
         // @ts-ignore
        return !this;
    });
}

const CartPage = () => {
    const {height, width} = WindowDimensions();
    const navigate = useNavigate();
    const [dirty, setDirty] = React.useState(false);
    const {state} = useLocation();
    const [fromLocation, setFromLocation] = React.useState('');
    const [checkout, setCheckout] = React.useState(false);
    function navigateBack()
    {
        navigate('/'); //
    }
    // set up cart context to get cart items
    const { cartItems, totalPrice, saveToCart, addToCart, removeFromCart} = useContext(CartContext);
    
    function handleChangeQuantity(itemID: string, newQuantity: number)
    {
        const item = cartItems[itemID];
        if(item)
        {
            item.quantity = newQuantity;
            saveToCart(item);
        }
    }
    React.useEffect(()=>
    {
        window.scrollTo(0,1) ;
        if(state && state.fromLocation)
        {
            setFromLocation(state.fromLocation)
        }
    },[state]);
    // cart appears to be doubling price whenever edit is enabled
    React.useEffect(()=>{
        console.log(window.location.href);
        if(Object.keys(cartItems).length === 0)
        {
            addToCart({id: '', item: Slamburger, quantity: 1, price: Slamburger.price});
        }}, []);
    
    function openCheckoutDialog()
    {
        setCheckout(true);
    }

    function closeCheckoutDialog()
    {
        setCheckout(false);
    }

    return (
      <ThemeProvider theme={theme}>
        <CheckoutDialog open={checkout} onConfirm={closeCheckoutDialog} onClose={closeCheckoutDialog}/>
        <NavBar bottomLabel='Checkout' onClick={openCheckoutDialog}>
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton sx={{pr: 3}} size="large" onClick={navigateBack}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}} expandText='false'>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>
                    <Typography>
                        Cart
                    </Typography>
                </Breadcrumbs>
            </Box>
          <Typography sx={{ paddingTop: 1, width: '100%' }} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>
            Review Order
          </Typography>
          <Box sx={{ paddingTop: 1, width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-around'}}>
            <Stack spacing={2} justifyContent={'space-around'} sx={{paddingBottom: 10}}>
                {Object.values(cartItems).map((cartItem) => (
                    <CartItemCard key={cartItem.item.name + cartItem.id} cartItem={cartItem} handleChangeQuantity={handleChangeQuantity} handleRemoveItem={removeFromCart}/>
                ))}
            </Stack>
          </Box>
            <Paper elevation={2} sx={{backgroundColor: '#F2EEEA', borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.dennysGrey.main, display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', height: 60, width: 300, borderBox: 'content-box', borderTopRadius: 5, position: 'fixed', bottom: 56, left: '50%', transform: "translateX(-50%)"}}>
                <Box sx={{display: 'flex', width: '100%', boxSizing: 'border-box', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', fontSize: 16, p: 1}}>
                    <Typography variant="h6" fontSize='inherit'>
                        Total:
                    </Typography>
                    <Typography variant='h6' fontSize='inherit'>
                            ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
            </Paper>
        </NavBar>
      </ThemeProvider>
    );
  };
  
  export default CartPage;