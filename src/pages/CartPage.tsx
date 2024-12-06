import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar/Navbar';
import { Box, Button, Typography, ThemeProvider, Grid2, Breadcrumbs, IconButton, Stack, Paper, Dialog, DialogTitle, DialogContent, DialogActions, SnackbarContent} from '@mui/material';
import theme from '../styles/Theme';
import CartItemCard from '../components/CartPage/CartItemCard';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../types/CartItem';
import SlamburgerFilled from '../types/SlamburgerFilled';
// dummy menu items for testing
import { HandheldsList } from '../types/HandheldsMenu';
import FoodItem from '../types/FoodItem';
import { v4 } from 'uuid';
import { ArrowBackIosRounded } from '@mui/icons-material';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import WindowDimensions from '../components/WindowDimensions';
import CheckoutDialog from '../components/CartPage/CheckoutDialog';
import Snackbar from '@mui/material/Snackbar';
import DebugFab from '../components/DebugFab';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import TopSnackbarEnhanced from '../components/TopSnackbarEnhanced';

const CartPage = () => {
    const {height, width} = WindowDimensions();
    const navigate = useNavigate();
    const [dirty, setDirty] = React.useState(false);
    const {state} = useLocation();
    const [fromLocation, setFromLocation] = React.useState('');
    const [checkout, setCheckout] = React.useState(false);
    const [saveChanges, setSavedChanges] = React.useState(false);
    const [itemDeleted, setItemDeleted] = React.useState(false);
    const [checkoutSnackbar, setCheckoutSnackbar] = React.useState(false);
    const { cartItems, totalPrice, saveToCart, addToCart, removeFromCart, saveComments} = useContext(CartContext);
    // snackbar functions
    
    const openCheckoutDialog = React.useCallback(function openCheckoutDialog() { setCheckout(true); },[]);
    const closeCheckoutDialog = React.useCallback(function() { setCheckoutSnackbar(true); setCheckout(false); },[]);
    const closeSnackbar = React.useCallback(()=> { 
            // there's never a time when more than one snackbar is open, so use this function to close them all.
            setCheckoutSnackbar(false);
            setSavedChanges(false);
            setItemDeleted(false);
    },[]);

    function openItemDeletedSnackbar(itemID: string)
    { 
        removeFromCart(itemID); setItemDeleted(true);
    }
    const navigateBack = React.useCallback(function navigateBack()
    {
        if(state && state.fromLocation)  navigate(state.fromLocation); //
        else navigate('/');
    },[state]);

    function fakeNavigate(){
        navigate('/cart', {state:{saved: true}});
    }
    // set up cart context to get cart items

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
        if(state && state.saved)
        {
            setSavedChanges(state.saved);
        }
        window.history.replaceState({},''); // clear the state so it doesn't get cluttered.
    },[state]);

    React.useEffect(()=>
    {
        addToCart({id: '', quantity: 1, price: SlamburgerFilled.price, item: SlamburgerFilled});
        if(state && state.saved)
        {
            setSavedChanges(state.saved);
        }
    },[state])
    function avoidUnsafeReload(e: BeforeUnloadEvent)
    {
        e.preventDefault();
        e.returnValue = "";
    }
    React.useEffect(()=>
    {
        window.addEventListener('beforeunload', avoidUnsafeReload);
        return(()=> window.removeEventListener('beforeunload', avoidUnsafeReload ));
    },[]);
    return (
      <ThemeProvider theme={theme}>
        <TopSnackbarEnhanced color='white' backgroundColor={theme.palette.success.main} open={checkoutSnackbar} timeout={2500} onClose={closeSnackbar} message={<Typography fontSize={18} fontWeight={500}>Order Placed!</Typography>} action={<CheckRoundedIcon fontSize='large'/>}/>
        <TopSnackbarEnhanced color='white' backgroundColor={theme.palette.error.main} open={itemDeleted} timeout={2500} onClose={closeSnackbar} message={<Typography fontSize={18} fontWeight={500}>Item Removed</Typography>}/>
        <TopSnackbarEnhanced color='white' backgroundColor={theme.palette.success.main} open={saveChanges} timeout={2500} onClose={closeSnackbar} message={<Typography fontSize={18} fontWeight={500}>Changes Saved</Typography>} action={<CheckRoundedIcon fontSize='large'/>}/>
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
            <Stack spacing={2} justifyContent={'space-around'} sx={{paddingBottom: 15}}>
                {Object.values(cartItems).map((cartItem) => (
                    <CartItemCard key={cartItem.item.name + cartItem.id} cartItem={cartItem} handleChangeQuantity={handleChangeQuantity} handleRemoveItem={openItemDeletedSnackbar}/>
                ))}
            </Stack>
          </Box>
            <Paper elevation={2} sx={{backgroundColor: 'white', borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.dennysGrey.main, display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', height: 80, width: '100%', borderBox: 'content-box', borderTopRadius: 5, position: 'fixed', bottom: 56, left: '50%', transform: "translateX(-50%)"}}>
                <Box sx={{display: 'flex', width: '100%', boxSizing: 'border-box', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', fontSize: 18, p: 2}}>
                    <Typography variant="h6" fontSize='inherit'>
                        Total:
                    </Typography>
                    <Typography variant='h6' fontSize='inherit'>
                            ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
            </Paper>
        </NavBar>
        <DebugFab show onClick={closeCheckoutDialog}/>
      </ThemeProvider>
    );
  };
  
  export default CartPage;