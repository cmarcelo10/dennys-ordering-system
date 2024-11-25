import React, {useState, useEffect} from 'react'
import Categories from '../types/MenuCategories'
import Category from '../types/Category'
import Navbar from '../components/Navbar'
import { Card, createTheme, ThemeProvider, Stack, Typography, Toolbar, Grid2, CardMedia, CardActionArea} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader';
import theme from '../styles/Theme.ts'
import BourbonBaconBurger from '../assets/food/BourbonBaconBurger.jpg'
const MainMenu = () =>
{
    const [cardsArray, setCardsArray] = useState<Category[]>([]);
    useEffect((()=>
        {
            setCardsArray(Categories);
        }), []);
    
    return (
        <ThemeProvider theme={theme}>
        <Navbar bottomLabel='Review Order'>
            <Grid2 container alignContent="center" justifyContent='space-evenly' alignSelf='center' columnSpacing={0.5} rowSpacing={2} paddingBottom={2}>
                {
                    cardsArray.map(item=>(
                    <Card key={item.index} elevation={3} sx={{display: "flex", borderStyle: 'solid', borderWidth: 0.5, borderColor: theme.palette.dennysGrey.main, borderRadius: 2, flexDirection: 'column', maxHeight: '180px', width: '180px'}}>
                       <CardActionArea>
                            <CardMedia component='img' src={BourbonBaconBurger} height={120} />
                            <CardContent sx={{p: 0.75, pl: 0.5, pr: 0.5, alignSelf: 'center', justifyContent: 'center'}}>
                                <Typography textAlign='center' variant='h6' lineHeight={1.25} fontSize={20}>{item.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)) 
                }
            </Grid2>
        </Navbar>
    </ThemeProvider>)
}
export default MainMenu