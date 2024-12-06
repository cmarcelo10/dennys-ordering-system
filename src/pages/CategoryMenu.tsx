import React, { useContext } from 'react'
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
import {Button, Fab, ThemeProvider, Toolbar} from '@mui/material'
import Navbar from '../components/NavBar/Navbar.tsx'
import Divider from '@mui/material/Divider'
import FoodItem from '../types/FoodItem.ts'
import * as FoodItems from '../types/HandheldsMenu.ts'
import theme from '../styles/Theme.ts'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'
import { CartContext } from '../contexts/CartContext.tsx'
import DealsPage from './DealsPage.tsx'
import TopSnackbar from '../components/TopSnackbar.tsx'
import { AddCircleOutlineRounded, BugReport } from '@mui/icons-material'
import WindowDimensions from '../components/WindowDimensions.tsx'
import ReactDOM from 'react-dom'
import DebugFab from '../components/DebugFab.tsx'
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

const MenuBreadcrumbs = ({categoryName}:{categoryName: string})=>
{
    const navigate = useNavigate();
    return(
    <Box display="flex" flexDirection="row" alignContent={'center'}>
        <IconButton size="medium" onClick={()=>navigate('/')}>
            <ArrowBackIosRounded/>
        </IconButton>
        <Breadcrumbs sx={{alignContent: 'center'}}>
            <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>
            <Typography>
                {categoryName}
            </Typography>
        </Breadcrumbs>
    </Box>)
}

const CategoryMenu = () =>
{
    const navigate = useNavigate();
    const {totalPrice} = useContext(CartContext);
    const {height, width} = WindowDimensions();
    const {state} = useLocation();
    const location = React.useRef(useLocation());
    const [cardsArray, setCardsArray] = React.useState<FoodItem[]>([]);
    const [categoryFound, setCategoryFound] = React.useState<boolean>(false);
    const [categoryName, setCategoryName] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [addedItemName, setAddedItemName] = React.useState('');

    function openSnackbar()
    {
        navigate(`/browse?category=${encodeURIComponent(categoryName)}`, {state:
            {
                itemAdded: true,
                itemName: "Slamburger",
            }
        });
    }
    function closeSnackbar()
    {
        setSnackbarOpen((prev)=>!prev);
    }
    React.useEffect(()=>
    {
        if(state && state.itemAdded && state.itemName)
        {
            console.log(state.itemName);
            setAddedItemName(state.itemName)
            setSnackbarOpen(true);
            window.history.replaceState({},''); // purge the state
        }
    }, [state]);

    React.useEffect((()=>
    {
        if(!state)
        {
            console.log("no state");
        }
        const queryParams = new URLSearchParams(location.current.search);
        const menuCategory = queryParams.get('category');
        console.log(menuCategory);
        if(menuCategory === null || menuCategory === undefined)
        {
            navigate("/"); // go home
        }
        const catName = decodeURIComponent(menuCategory!);
        if(catName === "Sandwiches and Burgers")
        {
            setCardsArray(FoodItems.HandheldsList);
            setCategoryName(catName)
        } else if (catName === "Deals and Promos"){
            setCategoryName(catName);
        }
    }));

    const ErrorComponent = ()=>
    (
        <ThemeProvider theme={theme}>
            <Navbar bottomLabel={"Page Not Implemented"}> {/* Bump this up to Main and use context*/}
            <MenuBreadcrumbs categoryName='Not Implemented'/>
            <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Page not implemented</Typography>
            </Navbar>
        </ThemeProvider>
    );

    if(!categoryName)
    {
        return (<ErrorComponent />)
    }
    else if (categoryName == "Deals and Promos"){
        return(
            <ThemeProvider theme={theme}>
            <Navbar bottomLabel={`Review Order - ${totalPrice.toFixed(2)}`}> {/* Bump this up to Main and use context*/}
                <MenuBreadcrumbs categoryName='Deals and Promotions'/>
                <DealsPage />
            </Navbar>
            </ThemeProvider>);
    } else
    {
        return (
        <ThemeProvider theme={theme}>
             
              <Navbar bottomLabel={`Review Order - $${totalPrice.toFixed(2)}`}> {/* Bump this up to Main and use context*/}
                <TopSnackbar open={snackbarOpen? snackbarOpen : false} message={`${addedItemName} added`} onClose={closeSnackbar} timeout={10000}/>
                <MenuBreadcrumbs categoryName='Sandwiches and Burgers'/>
                <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Sandwiches and Burgers</Typography>
                <Divider variant='middle'/>
                <Stack spacing={3} sx={{paddingTop: 3, paddingBottom: 3, overflowY: 'scroll'}}>
                {
                    cardsArray.map((item, index)=>(
                        <MenuCard key={index} name={item.name} description={item.description} image={item.image} price={item.price} />
                    )) 
                }
                </Stack>
                <TopSnackbar open={snackbarOpen? snackbarOpen : false} message={`${addedItemName} added`} onClose={closeSnackbar} timeout={2000}/>
                <DebugFab show onClick={openSnackbar}/>
            </Navbar>
        </ThemeProvider>
        );
    }
}
export default CategoryMenu