import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { Navigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import {Breadcrumbs, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, createTheme, ThemeProvider, Toolbar} from '@mui/material'
import Button from '@mui/material/Button'
import NavBar from '../components/Navbar'
import Navbar from '../components/Navbar'
import SlamburgerImage from '../assets/Slamburger.png'
import SlamburgerSquare from '../assets/Slamburger.jpg'
import WindowDimensions from '../components/WindowDimensions'
const dennysBrown: string = "#464340"
const dennysYellow: string = "#ffd31a"
const dennysRed: string = "#d63d42"
const dennysGrey: string = "#474355"

const theme = createTheme();

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
const HandheldsMenu = () =>
{
    const {height, width} = WindowDimensions()
    const [cardsArray, setCardsArray] = useState<Array<StringNode>>([]);
    useEffect((()=>
    {
        let stringArray: StringNode[] = [];
        for(let i: number = 0; i < 10; ++i)
        {
            stringArray.push({index: i, title: "Lorem Ipsum", description: dummyText})
        }
        setCardsArray(stringArray);
    }), []);
    
    return (
        <ThemeProvider theme={theme}>
        <Navbar bottomLabel='foo'>
            <Breadcrumbs sx={{position: 'sticky', top: 0}}>
            <Typography>
                Main Menu
            </Typography>
            <Typography>
                Sandwiches & Burgers
            </Typography>
            </Breadcrumbs>
            <Typography variant='h3' fontFamily={'Roboto'} fontWeight={500} fontSize={30}>Sandwiches and Burgers</Typography>
            <Stack spacing={3} sx={{paddingTop: 3}}>
                {
                    cardsArray.map(item=>(
                    <Card key={item.index} elevation={2} sx={{display: "flex", flexDirection: 'column', borderRadius: 8}}>
                        <CardActionArea>
                            <Box padding='4px'>
                                <CardHeader sx={{
                                    '&.MuiCardHeader-root':
                                    {
                                        padding: '2px',
                                    },
                                }} title={'Lorem ipsum'}/>
                                <CardContent sx={{

                                    textAlign: 'left', 
                                    textJustify: 'justify', 
                                    '&.MuiCardContent-root':
                                    {
                                        padding: 0
                                    }
                                    }}>
                                    <Box display='flex' flexDirection={'row'} alignItems={'top'}  justifyContent={'space-between'}>
                                        <Typography fontSize={14} sx={{textAlign: 'justify', textJustify: 'justify', padding: '5px', maxLines: 4, overflow: 'hidden', paddingTop: 0, paddingBottom: 0}} variant='body1' color="black">{item.description}</Typography>
                                        <Box display='flex' flexDirection='column' textAlign={'right'}>
                                        <Box component='img' height={imageDimensions.width*0.75} width={imageDimensions.width*0.75} paddingLeft={1} borderColor={'black'} src={SlamburgerSquare}/>
                                        <Typography margin='4px' fontSize="large"> $19.99</Typography>
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