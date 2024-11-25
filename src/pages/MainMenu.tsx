import React, {useState, useEffect} from 'react'
import Categories from '../types/MenuCategories'
import Category from '../types/Category'
import Navbar from '../components/Navbar'
import { Card, createTheme, ThemeProvider, Stack, Typography, Toolbar, Grid2} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader';
import theme from '../styles/Theme.ts'
const MainMenu = () =>
{
    const [cardsArray, setCardsArray] = useState<Category[]>([]);
    useEffect((()=>
        {
            setCardsArray(Categories);
        }), []);
    
    return (
        <ThemeProvider theme={theme}>
        <Navbar bottomLabel='foo'>
            <Grid2 container alignContent="center" justifyContent='space-evenly' alignSelf='center' columnSpacing={0.5} rowSpacing={2} paddingBottom={2}>
                {
                    cardsArray.map(item=>(
                    <Card key={item.index} elevation={2} sx={{display: "flex", border: '2px solid black', flexDirection: 'column', height: '175px', width: '175px'}}>
                        <CardHeader title={<Typography variant='h6' color="black">
                                {item.name}
                            </Typography>} sx={{color: "black", fontFamily: 'roboto'}}>
                        </CardHeader>
                        <CardContent sx={{textAlign: 'left', textJustify: 'justify'}}>
                        </CardContent>
                    </Card>)) 
                }
            </Grid2>
        </Navbar>
    </ThemeProvider>)
}
export default MainMenu