import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { Navigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import {Card, CardActionArea, CardActions, CardContent, CardHeader, createTheme, ThemeProvider, Toolbar} from '@mui/material'
import Button from '@mui/material/Button'
import NavBar from '../components/Navbar'
import Navbar from '../components/Navbar'

const dennysBrown: string = "#464340"
const dennysYellow: string = "#ffd31a"
const dennysRed: string = "#d63d42"
const dennysGrey: string = "#474355"

const theme = createTheme();

const dummyText = "Lorem ipsum dolor sit amet, consectetur" + 
                " adipiscing elit. Nam sagittis quam est, non vulputate nulla" + 
                " eleifend et. Phasellus scelerisque at ipsum et imperdiet." +
                " In mattis arcu et quam auctor maximus. Vestibulum vitae lectus nulla. Nunc nec consectetur arcu."+
                " In metus nulla, ultrices et hendrerit eu, congue a tortor." +
                " Curabitur sed dui lacinia, hendrerit sem quis, pulvinar leo.";
type StringNode = 
{
    index: number,
    title: string,
    description: string,
}
const HandheldsMenu = () =>
{
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
            <Toolbar/>
            <Stack spacing={3}>
                {
                    cardsArray.map(item=>(
                    <Card key={item.index} elevation={2} sx={{display: "flex", flexDirection: 'column'}}>
                        <CardHeader title={<Typography variant='h3' color="black">
                                {item.title}
                            </Typography>} sx={{color: "black", fontFamily: 'roboto'}}>
                            
                        </CardHeader>
                        <CardContent sx={{textAlign: 'left', textJustify: 'justify'}}>
                            <Typography variant='body1' color="black"> {item.description} </Typography>
                        </CardContent>
                    </Card>)) 
                }
            </Stack>
            <Toolbar />
        </Navbar>
    </ThemeProvider>)
}
export default HandheldsMenu