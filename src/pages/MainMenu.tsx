import React, {useState, useEffect} from 'react'
import Categories from '../components/MenuCategories'
import Category from '../components/Category'
import Navbar from '../components/Navbar'
import { Card, createTheme, ThemeProvider, Stack, Typography, Toolbar, Grid2} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
const theme = createTheme();
const dummyText = "Lorem ipsum dolor sit amet, consectetur" + 
                " adipiscing elit. Nam sagittis quam est, non vulputate nulla" + 
                " eleifend et. Phasellus scelerisque at ipsum et imperdiet." +
                " In mattis arcu et quam auctor maximus. Vestibulum vitae lectus nulla. Nunc nec consectetur arcu."+
                " In metus nulla, ultrices et hendrerit eu, congue a tortor." +
                " Curabitur sed dui lacinia, hendrerit sem quis, pulvinar leo.";


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