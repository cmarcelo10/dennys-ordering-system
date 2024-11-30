import react, { useContext, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { Box, Button, Typography, ThemeProvider, Grid } from '@mui/material';
import theme from '../styles/Theme';
import CartItemCard from '../components/CartItemCard';
import { CartContext } from '../contexts/CartContext';

// dummy menu items for testing
import { HandheldsList } from '../types/MenuItems';
import FoodItem from './types/FoodItem';

// dummy CartItem list
const dummyCartItems = [
    {
      id: 1,
      item: {
        name: "Bacon Cheeseburger",
        parentCategory: "Burgers",
        price: 8.99,
        customizations: [
          {
            name: "Sides",
            label: "Side",
            customizations: [
              { name: "Fries", price: 2.0, isMutuallyExclusive: true, selected: true },
            ],
            isRequired: true,
            maxSelectAmount: 1,
            amountSelected: 1
          },
          {
            name: "Extras",
            label: "Add extras",
            customizations: [
              { name: "Extra Bacon", price: 1.5, isMutuallyExclusive: false, selected: true },
              { name: "Cheese", price: 1.0, isMutuallyExclusive: false, selected: true }
            ],
            isRequired: false,
            maxSelectAmount: 2,
            amountSelected: 2
          }
        ]
      },
      quantity: 2
    },
    {
      id: 2,
      item: {
        name: "Veggie Pizza",
        parentCategory: "Pizzas",
        price: 12.99,
        customizations: [
          {
            name: "Crust",
            label: "Crust",
            customizations: [
              { name: "Thin Crust", price: 0, isMutuallyExclusive: true, selected: true },
            ],
            isRequired: true,
            maxSelectAmount: 1,
            amountSelected: 1
          },
          {
            name: "Toppings",
            label: "Toppings",
            customizations: [
              { name: "Olives", price: 0.5, isMutuallyExclusive: false, selected: true },
              { name: "Mushrooms", price: 0.5, isMutuallyExclusive: false, selected: true }
            ],
            isRequired: false,
            maxSelectAmount: 2,
            amountSelected: 2
          }
        ]
      },
      quantity: 1
    }
  ];


const CartPage = () => {
    // set up cart context to get cart items
    const { cartItems, totalPrice, setCartContext } = useContext(CartContext);

    // set up cart with dummy cart data
    useEffect(() => {
        const totalPrice = dummyCartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
        setCartContext(dummyCartItems, totalPrice);
    }, [setCartContext]);


    return (
      <ThemeProvider theme={theme}>
        <NavBar bottomLabel='Confirm & Place Order'>
          <Typography sx={{ paddingTop: 3, width: '100%' }} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>
            Review Order
          </Typography>
          <Box sx={{ paddingTop: 1, width: '100%' }}>
            <Grid container spacing={2}>
                {cartItems.map((cartItem, index) => (
                    <Grid item xs={12} key={index}>
                    <CartItemCard item={cartItem.item} quantity={cartItem.quantity} />
                    </Grid>
                ))}
            </Grid>
          </Box>
            <Typography sx={{ paddingTop: 2, width: '100%' }} variant='h5' textAlign="center">
            Total Price: ${totalPrice.toFixed(2)}
            </Typography>
        </NavBar>
      </ThemeProvider>
    );
  };
  
  export default CartPage;