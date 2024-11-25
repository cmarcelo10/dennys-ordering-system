import React from 'react'
import Typography from '@mui/material/Typography'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea' 
import CardContent from '@mui/material/CardContent' 
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import {ThemeProvider} from '@mui/material'
import Navbar from '../components/Navbar'
import Divider from '@mui/material/Divider'
import FoodItem from '../types/FoodItem'
import * as FoodItems from '../types/MenuItems.ts'
import theme from '../styles/Theme.ts'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'

const imageDimensions = 
{
    width: 112.5,
    height: 112.5,
}

const HandheldsMenu = () =>
{
    const navigate = useNavigate();
    const [cardsArray, setCardsArray] = React.useState<FoodItem[]>([]);
    React.useEffect((()=>
    {
        setCardsArray(FoodItems.HandheldsList);
    }), []);
    
    return (
        <ThemeProvider theme={theme}>
            <Navbar bottomLabel='foo'> {/* Bump this up to Main and use context*/}
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton size="medium" onClick={()=>navigate('/')}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}}>
                    <ReactRouterLink to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </ReactRouterLink>
                        Main Menu {/* Need to link this to the main menu... it's kind of annoying that */}
                    <Typography>
                        Sandwiches and Burgers
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography sx={{paddingTop: 1, width: '100%'}}variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Sandwiches and Burgers</Typography>
            <Divider variant='middle'/>
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
                                        p: '8px', 
                                        pl: 1, 
                                        pr: 1,
                                    }
                                }} title={
                                    <Typography variant='h4' fontSize={28} fontWeight={500}>
                                        {item.name}
                                        </Typography>
                                    }/>
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
                                            <Box component='img' height={imageDimensions.height} width={imageDimensions.width} paddingLeft={1} borderColor={'black'} src={item.image}/>
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