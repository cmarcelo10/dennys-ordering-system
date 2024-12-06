import React, {useState, useEffect, useContext} from 'react'
import Categories from '../types/MenuCategories'
import Category from '../types/Category'
import Navbar from '../components/NavBar/Navbar.tsx'
import { Card, createTheme, ThemeProvider, Stack, Typography, Toolbar, Grid2, CardMedia, CardActionArea, Breadcrumbs, Box, Divider} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader';
import theme from '../styles/Theme.ts'
import BourbonBaconBurger from '../assets/food/BourbonBaconBurger.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext.tsx'
const MainMenu = () =>
{
    const navigate = useNavigate();
    const [cardsArray, setCardsArray] = useState<Category[]>([]);
    const {totalPrice} = useContext(CartContext);
    useEffect((()=>
    {
        setCardsArray(Categories);
    }), []);

    const handleNavigate = (categoryName: string) =>
    {
        console.log(categoryName);
        console.log(encodeURIComponent(categoryName));
        navigate(`/browse?category=${encodeURIComponent(categoryName)}`);
    }
    const goToCart = () =>
    {
        navigate('/cart', {state: {fromLocation:'/'}});
    }
    return (
        <ThemeProvider theme={theme}>
        <Navbar bottomLabel={`Review Order - $ ${totalPrice.toFixed(2)}`} onClick={goToCart}>
            <Typography sx={{paddingTop: 3, width: '100%'}} variant='h2' fontFamily={"'Roboto', 'Helvetica', 'Arial', sans-serif"} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Main Menu</Typography>
            <Divider variant='middle'/>
            <Grid2 container alignContent="center" justifyContent='space-evenly' alignSelf='center' columnSpacing={0.5} rowSpacing={2} paddingBottom={3} pt={3}>
                {
                    cardsArray.map(item=>(
                    <Card key={item.index} elevation={3} sx={{display: "flex", borderStyle: 'solid', borderWidth: 0.5, borderColor: theme.palette.dennysGrey.main, borderRadius: 2, flexDirection: 'column', maxHeight: '180px', width: '160px'}}>
                       <CardActionArea onClick={()=>{handleNavigate(item.name)}}>
                            <CardMedia component='img' src={item.image? item.image : BourbonBaconBurger} height={120}/>
                            <CardContent sx={{p: 0.75, pl: 0.5, pr: 0.5, alignSelf: 'center', justifyContent: 'center'}}>
                                <Typography textAlign='center' variant='h6' lineHeight={1.25} fontSize={18}>{item.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)) 
                }
            </Grid2>
        </Navbar>
        </ThemeProvider>
    )
}
export default MainMenu