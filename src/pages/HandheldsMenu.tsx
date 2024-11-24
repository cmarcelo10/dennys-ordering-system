import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { Navigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import {Breadcrumbs, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, createTheme, Link, ThemeProvider, Toolbar} from '@mui/material'
import Button from '@mui/material/Button'
import NavBar from '../components/Navbar'
import Navbar from '../components/Navbar'

import WindowDimensions from '../components/WindowDimensions'
import * as FoodItems from '../components/FoodItems.ts'

import Divider from '@mui/material/Divider'
import FoodItem from '../components/FoodItem'
import theme from '../styles/Theme.ts'

const dummyText = "Lorem ipsum dolor sit amet, consectetur" + 
" adipiscing elit. Nam sagittis quam est, non vulputate nulla" + 
 " eleifend et. Phasellus scelerisque at ipsum et imperdiet.";


type StringNode = 
{
    index: number,
    title: string,
    description: string,
}
const imageDimensions = 
{
    width: 150,
    height: 150,
}

const cardHeight= 250
const DividerProps =
{
    '&.MUIDivider-root':
    {
        height: '8px'
    }
}
const HandheldsMenu = () =>
{
    const {height, width} = WindowDimensions()
    const [cardsArray, setCardsArray] = useState<FoodItem[]>([]);
    useEffect((()=>
    {
        setCardsArray(FoodItems.HandheldsList);
    }), []);
    
    return (
        <ThemeProvider theme={theme}>
            <Navbar bottomLabel='foo'>
            <Breadcrumbs sx={{position: 'sticky', top: 0, bottom: 'auto'}}>
            <Typography>
                Main
            </Typography>
            <Typography>
                Sandwiches and Burgers
            </Typography>
            </Breadcrumbs>
            <Typography sx={{paddingTop: 2, width: '100%'}}variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Sandwiches and Burgers</Typography>
            <Divider sx={DividerProps} variant='middle'/>
            <Stack spacing={3} sx={{paddingTop: 3, paddingBottom: 3, overflowY: 'scroll'}}>
                {
                    cardsArray.map(item=>(
                    <Card elevation={5} sx={{display: "flex", flexDirection: 'column', borderRadius: 8, backgroundColor: "#F2EEEA"}}>
                        <CardActionArea>
                            <Box padding='4px' paddingLeft={1} paddingRight={1}>
                                <CardHeader sx={{
                                    fontWeight: 500,
                                    '&.MuiCardHeader-root':
                                    {
                                        padding: '8px',
                                        pl: 1,
                                        pr: 1,
                                    },
                                }} title={<Typography variant='h4' fontSize={28} fontWeight={500}>{item.name}</Typography>}/>
                                <CardContent sx={{
                                    textAlign: 'left', 
                                    textJustify: 'justify', 
                                    '&.MuiCardContent-root':
                                    {
                                        padding: '2px'
                                    }
                                    }}>
                                    <Box display='flex' flexDirection={'row'} alignItems={'top'}  justifyContent={'space-between'}>
                                        <Typography fontSize={14}  sx={{textAlign: 'justify', textJustify: 'justify', padding: '4px', maxLines: 4, overflow: 'hidden', paddingTop: 0}} variant='body1' color="black">{item.description}</Typography>
                                        <Box display='flex' flexDirection='column' textAlign={'right'}>
                                        <Box component='img' height={imageDimensions.width*0.75} width={imageDimensions.width*0.75} paddingLeft={1} borderColor={'black'} src={item.image}/>
                                        <Typography margin='4px' fontSize={20} fontWeight={500}> $19.99</Typography>
                                    </Box>
                                    </Box>
                                </CardContent>
                                
                                </Box>
                        </CardActionArea>
                    </Card>)) 
                }
            </Stack>
        </Navbar>
        
    </ThemeProvider>)
}
export default HandheldsMenu


//<Box position='fixed' left={0} height={height} width={width} paddingBottom={2} overflow='scroll'>
//</Box>
//