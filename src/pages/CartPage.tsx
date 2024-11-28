import react from 'react';
import NavBar from '../components/Navbar';
import { Box, Button, Typography, ThemeProvider } from '@mui/material';
import theme from '../styles/Theme';

const CartPage = () => {




    return (
        <ThemeProvider theme={theme}>
            <NavBar bottomLabel='Checkout'>
            
            </NavBar>
            
        </ThemeProvider>
    )
}

export default CartPage;