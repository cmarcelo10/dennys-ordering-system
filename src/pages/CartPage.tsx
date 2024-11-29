import react from 'react';
import NavBar from '../components/Navbar';
import { Box, Button, Typography, ThemeProvider, Grid } from '@mui/material';
import theme from '../styles/Theme';
import CartItemCard from '../components/CartItemCard';

// dummy menu items for testing
import { HandheldsList } from '../types/MenuItems';
import FoodItem from './types/FoodItem';

// dummy CartItem list
const dummyCartItems = [
  {
    item: {
      name: "Bacon Cheeseburger",
      price: 8.99,
      customizations: [
        {
          name: "Sides",
          label: "Choose your side",
          customizations: [
            { name: "Fries", price: 2.0, isMutuallyExclusive: true },
            { name: "Salad", price: 2.5, isMutuallyExclusive: true }
          ],
          isRequired: true,
          maxSelectAmount: 1
        },
        {
          name: "Extras",
          label: "Add extras",
          customizations: [
            { name: "Extra Bacon", price: 1.5, isMutuallyExclusive: false },
            { name: "Cheese", price: 1.0, isMutuallyExclusive: false }
          ],
          isRequired: false,
          maxSelectAmount: 2
        }
      ]
    },
    quantity: 2,
    price: 8.99
  },
  {
    item: {
      name: "Veggie Pizza",
      price: 12.99,
      customizations: [
        {
          name: "Crust",
          label: "Choose your crust",
          customizations: [
            { name: "Thin Crust", price: 0, isMutuallyExclusive: true },
            { name: "Thick Crust", price: 1.0, isMutuallyExclusive: true }
          ],
          isRequired: true,
          maxSelectAmount: 1
        },
        {
          name: "Toppings",
          label: "Add toppings",
          customizations: [
            { name: "Olives", price: 0.5, isMutuallyExclusive: false },
            { name: "Mushrooms", price: 0.5, isMutuallyExclusive: false }
          ],
          isRequired: false,
          maxSelectAmount: 2
        }
      ]
    },
    quantity: 1,
    price: 12.99
  }
];


const CartPage = () => {
    return (
      <ThemeProvider theme={theme}>
        <NavBar bottomLabel='Confirm & Place Order'>
          <Typography sx={{ paddingTop: 3, width: '100%' }} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>
            Review Order
          </Typography>
          <Box sx={{ paddingTop: 1, width: '100%' }}>
            <Grid container spacing={2}>
              {dummyCartItems.map((cartItem, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <CartItemCard item={cartItem.item} quantity={cartItem.quantity} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </NavBar>
      </ThemeProvider>
    );
  };
  
  export default CartPage;