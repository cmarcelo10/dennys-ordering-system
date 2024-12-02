import React from 'react'
import Typography from '@mui/material/Typography'
import {createBrowserRouter, Link,  useLocation,  useNavigate} from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea' 
import CardContent from '@mui/material/CardContent' 
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import {Button, ThemeProvider} from '@mui/material'
import Navbar from '../components/Navbar.tsx'
import Divider from '@mui/material/Divider'
import FoodItem from '../types/FoodItem.ts'
import * as FoodItems from '../types/MenuItems.ts'
import theme from '../styles/Theme.ts'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'
import DiscountItem from '../types/DiscountItem.ts'
import * as DiscountItems from '../types/DiscountMenuItems.ts'

const imageDimensions = 
{
    width: 112.5,
    height: 112.5,
}
interface MenuCardProps
{
    name: string,
    image?: string, 
    description?: string,
    price: number,
}
const MenuCard = ({name, image, description, price}:MenuCardProps)=>
{
    const navigate = useNavigate();
    const openItemPage = (itemName: string) =>
    {
        const encodedName = encodeURIComponent(itemName);
        navigate(`/browse/customize?item=${encodedName}`);
    }
    return (
        <Card key={name} elevation={5} sx={{display: "flex", flexDirection: 'column', borderRadius: 8, backgroundColor: "#F2EEEA"}}>
            <CardActionArea onClick={()=>{openItemPage(name);}}>
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
                            {name}
                            </Typography>
                        }/>
                    <CardContent sx={{
                        textAlign: 'left',
                        '&.MuiCardContent-root':
                        {
                            padding: '2px'
                        }
                        }}>
                        <Box display='flex' flexDirection={'row'} alignItems={'top'}  justifyContent={'space-between'}>
                            <Typography fontSize={14}  sx={{padding: '4px', maxLines: 4, overflow: 'hidden', paddingTop: 0}} variant='body1' color="black">{description}</Typography>
                            <Box display='flex' flexDirection='column' textAlign={'right'}>
                                <Box component='img' loading='lazy' height={imageDimensions.height} width={imageDimensions.width} paddingLeft={1} borderColor={'black'} src={image}/>
                                <Typography margin='4px' fontSize={20} fontWeight={500}>${price}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
const CategoryMenu = () =>
{
    const navigate = useNavigate();
    const openItemPage = (itemName: string) =>
    {
        const encodedName = encodeURIComponent(itemName);
        navigate(`/browse/customize?item=${encodedName}`);
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const menuCategory = queryParams.get('category');
    const [cardsArray, setCardsArray] = React.useState<FoodItem[]>([]);
    const [discountArray, setDiscountArray] = React.useState<DiscountItem[]>([]);
    const [categoryFound, setCategoryFound] = React.useState<boolean>(false);
    const [categoryName, setCategoryName] = React.useState('Not Found');
    
    React.useEffect((()=>
    {
        console.log(menuCategory);
        if(menuCategory === null || menuCategory === undefined)
        {
            navigate("/"); // go home
        }
        const catName = decodeURIComponent(menuCategory!);
        if(catName === "Sandwiches and Burgers")
        {
            setCardsArray(FoodItems.HandheldsList);
            setCategoryFound(true);
        } else if (catName === "Deals and Promos"){
            setDiscountArray(DiscountItems.DiscountList);
            setCategoryFound(true);
        }
    }), []);

    const ErrorComponent = ()=>
    (
        <ThemeProvider theme={theme}>
            <Navbar bottomLabel={"Page Not Implemented"}> {/* Bump this up to Main and use context*/}
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton size="medium" onClick={()=>navigate('/')}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}}>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>
                        Main Menu {/* Need to link this to the main menu... it's kind of annoying that */}
                    <Typography>
                        Category Not Found
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Page not implemented</Typography>
            </Navbar>
        </ThemeProvider>
    );

    if(!categoryFound)
    {
        return (
            <ErrorComponent />
        )
    }
    else if (menuCategory == "Deals and Promos"){
        return(
            <ThemeProvider theme={theme}>
            <Navbar bottomLabel='foo'> {/* Bump this up to Main and use context*/}
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton size="medium" onClick={()=>navigate('/')}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}}>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>{/* Need to link this to the main menu... it's kind of annoying that */}
                    <Typography>
                        Deals and Promos
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Deals and Promos</Typography>
            <Divider variant='middle'/>
            <Stack spacing={3} sx={{paddingTop: 3, paddingBottom: 3, overflowY: 'scroll'}}>
                {
                   discountArray.map(item=>(
                    <Card key={item.name} elevation={5} sx={{display: "flex", flexDirection: 'column', borderRadius: 8, backgroundColor: "#F2EEEA"}}>
                    
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
                                        {/* <Box component='img' height={imageDimensions.height} width={imageDimensions.width} paddingLeft={1} borderColor={'black'} src={item.image}/> */}
                                            {/* <Typography margin='4px' fontSize={20} fontWeight={500}> $19.99</Typography> */}
                                        </Box>
                                
                                    </Box>
                                    
                                </CardContent>
                            </Box>
                            <Box 
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'absolute' },
                                    alignItems: 'center',
                                    mt: { xs: 2, md: 0 },
                                }}
                            >
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    // To be added later
                                    // onClick={() => handleApplyDiscount(discount.id)}
                                    sx={{
                                        backgroundColor: theme.palette.dennysRed.main,
                                        width: { xs: '100%', md: 'auto' }, 
                                        maxWidth: '200px', 
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Apply
                                </Button>
                             </Box>   
                    </Card>)) 
                }
            </Stack>
        </Navbar>
        
    </ThemeProvider>
        )
    } else{
    return (
        <ThemeProvider theme={theme}>
            <Navbar bottomLabel='foo'> {/* Bump this up to Main and use context*/}
            <Box display="flex" flexDirection="row" alignContent={'center'}>
                <IconButton size="medium" onClick={()=>navigate('/')}>
                    <ArrowBackIosRounded/>
                </IconButton>
                <Breadcrumbs sx={{alignContent: 'center'}}>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>
                    <Typography>
                        Sandwiches and Burgers
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Sandwiches and Burgers</Typography>
            <Divider variant='middle'/>
            <Stack spacing={3} sx={{paddingTop: 3, paddingBottom: 3, overflowY: 'scroll'}}>
            {
                cardsArray.map(item=>(
                    <MenuCard name={item.name} description={item.description} image={item.image} price={item.price} />
                )) 
            }
        </Stack>
        </Navbar>
        
    </ThemeProvider>)
    }
}
export default CategoryMenu