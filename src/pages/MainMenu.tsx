import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Card, createTheme, ThemeProvider, Stack, Typography, Toolbar} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
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
const MainMenu = () =>
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
export default MainMenu