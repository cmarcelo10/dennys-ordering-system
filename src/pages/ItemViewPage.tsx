import React from 'react'
import Modal from '@mui/material/Modal'
import Slamburger from '../types/Slamburger'
import AllergenData from '../types/AllergenData'
import { AllergenDataTable } from '../types/AllergenData'
import NutritionalData from '../types/NutritionalData'
import { NutritionalDataTable } from '../types/NutritionalData'
import NavBar from '../components/NavBar/Navbar.tsx'
import FoodItem from '../types/FoodItem'
import CustomizationCategory from '../types/CustomizationCategory'
import CustomizationOption from '../types/CustomizationOption'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbNode from '../types/BreadcrumbNode'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import HandheldsMenu from './CategoryMenu'
import { HandheldsList } from '../types/HandheldsMenu.ts'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, createTheme, Divider, IconButton, Stack, Table, ThemeProvider, useTheme } from '@mui/material'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'
import ErrorPage from "../components/ErrorPage"
import theme from '../styles/Theme.ts'
import { Immer } from 'immer'
import CategoryCard from '../components/ItemViewPage/CategoryCard.tsx'
import ImportantInfoCard from '../components/ItemViewPage/ImportantInfoCard.tsx'
import { CartContext } from '../contexts/CartContext.tsx'
import CartItem from '../types/CartItem.ts'
import { v4 } from 'uuid'
import WindowDimensions from '../components/WindowDimensions.tsx'
import QuantitySelector from '../components/ItemViewPage/QuantitySelector.tsx'

const ItemDetailsTextArea = ({description}:{description: string | undefined}) =>
(
    <Typography fontSize={14}  sx={
        {
            textAlign: 'left',
            lineHeight: 2,
            padding: '4px', 
            maxLines: 4, 
            overflow: 
            'hidden', 
            paddingTop: 0}
        } variant='body1' 
        color="black">
            {description}
    </Typography>
);

const purgeCustomizations = (item: FoodItem) =>
{
    Object.values(item.customizations).forEach(cat => 
        {
            cat.amountSelected = 0;
            cat.totalPrice = 0;
            Object.values(cat.options).forEach(opt => opt.selected = false)
        }
    );
}

interface Customizations
{
    [key: string]: CustomizationCategory,
}
function timeout(delay: number)
{
    return new Promise(res =>setTimeout(res, delay));
}


// 
const ItemViewPage = ()=>
{
    const _itemName = React.useRef<string>('');
    const {height, width} = WindowDimensions();
    const [pageModified, setPageModified] = React.useState(false); // to track whether the user has changed parts of the page
    const basePrice = React.useRef(0);
    const [URLSearchParams, setURLSearchParams] = useSearchParams();
    const originalSelections = React.useRef<Customizations>({});
    const cartInitialized = React.useRef(false);
    const {cartItems, addToCart, saveToCart} = React.useContext(CartContext);
    const menu = React.useRef(HandheldsList);
    const [editing, setEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(false); // this flag is unused
    const isSaving = React.useRef(false);
    const navigate = useNavigate();
    const [itemFound, setItemFound] = React.useState(true);
    const [item, setFoodItem] = React.useState<FoodItem>(); // Adding the types 
    const foodItem = React.useRef<FoodItem>();
    const [cartItem, setCartItem] = React.useState<CartItem>();
    const [custOptions, setCustOptions] = React.useState<Customizations>({})
    const [price, setPrice] = React.useState<number>(0);
    const [quantity, setQuantity] = React.useState(1); 
    const [sideSaladSelected, setSideSaladSelected] = React.useState<boolean>(false); // future to do
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const parentLocation = item ? `/browse?category=${encodeURIComponent(item.parentCategory)}` : "/";
    const [disableAddItem, setDisableAddItem] = React.useState(true);

    const saveChanges = ()=>
    {
        if(pageModified)
        {
            window.sessionStorage.setItem("itemname", _itemName.current)
            window.sessionStorage.setItem("customizations", JSON.stringify(custOptions));
            window.sessionStorage.setItem("price", JSON.stringify(price));
        }
    }
    
    // Minor performance optimization so that React doesn't re-create this function object on re-renders
    const warnBeforeUnload = React.useCallback(function warnBeforeReload(event: BeforeUnloadEvent)
    {
        saveChanges();
        window.sessionStorage.setItem("isReload", "true");
        if(pageModified)
        {
            event.preventDefault();
            event.returnValue = ""; // deprecated, but necessary
        }
    }, [pageModified]);

    function handleAddToCart()
    {
        setLoading(true);
        if(!isSaving.current)
        {
            isSaving.current = true;
            if(item)
            {
                // remove the storage items
                // window.sessionStorage.removeItem('itemname');
                // window.sessionStorage.removeItem('customizations');
                // window.sessionStorage.removeItem('price');
                // window.sessionStorage.removeItem('isReload');

                // deep-copying to avoid memory shenanigans 
                let foodItemCopy =  structuredClone(item);
                foodItemCopy.customizations = structuredClone(custOptions);
                addToCart({id: '', item: foodItemCopy, price: price, quantity: quantity});
                navigate(parentLocation, {state:{
                    itemAdded: true,
                    itemName: item.name
                }}
                )
            }
        }
        return; // error.
    }
    function handleSaveEdits()
    {
        if(isSaving.current) return;
        isSaving.current = true
        if(cartItem)
        {
            let comparePrice = 0;
            // structured clone is not required here.
            cartItem.item.customizations = custOptions;
            Object.entries(custOptions).forEach(([key, value])=>
                {
                    let compareCategoryPrice = 0;
                    console.log(`Selections for ${key}:`);
                    Object.entries(value.options).forEach(([key, value])=>
                    {
                        console.log(`${key} is selected: ${value.selected}`);
                        if(value.selected)
                        {
                            console.log(`the price of ${key} is ${value.price}`);
                            compareCategoryPrice +=value.price;
                        }
                    })
                    if(compareCategoryPrice !== value.totalPrice)
                        console.error(`the price of ${key} should be ${compareCategoryPrice} but was ${value.totalPrice}`);
                    comparePrice+=compareCategoryPrice;
                }
            )
            if(comparePrice + cartItem.item.price !== price)
            {
                console.error(`the price should be ${comparePrice} but was ${price}`);
            }
            cartItem.price = price;
            cartItem.quantity = quantity;
            saveToCart(cartItem);
            navigate('/cart', {state: {saved: true}});
        }
    }

    // Separate useEffect to add event listeners on page reloads
    React.useEffect(()=>
    {
        window.addEventListener("beforeunload", warnBeforeUnload);
        return(()=>
        {
            window.removeEventListener("beforeunload", warnBeforeUnload);
        });
    },[pageModified]);

    React.useEffect(()=>
    {
        window.scrollTo(0,0);
        if(!cartInitialized.current)
        {
            async function waitForPageLoad()
            {
                setLoading(true);
                timeout(500);
                setLoading(false);
            }
            waitForPageLoad();
            // useEffect is usually used for handling external events, but in this case
            // I use it to prevent this initialization from happening every time.
            const queryParams = URLSearchParams;
            const itemName = queryParams.get('item');
            if(itemName)
            {
                _itemName.current = itemName;
            }
            const cartItemID = queryParams.get('id');
            if(cartItemID)
            {
                // edit mode.
                const foundCartItem = cartItems[decodeURIComponent(cartItemID)];
                if(foundCartItem)
                {
                    console.log("Found an item in the cart that matches");
                    console.log(foundCartItem);
                    setPrice(foundCartItem.price);
                    basePrice.current = foundCartItem.item.price;
                    setFoodItem(foundCartItem.item);
                    setQuantity(foundCartItem.quantity);
                    setCustOptions(foundCartItem.item.customizations);
                    setCartItem(foundCartItem);
                    setDisableAddItem(false);
                    setEditing(true);
                }
                cartInitialized.current = true;
            }
            else if(itemName)
            {
                const foundItem = menu.current.find((entry)=>entry.name === itemName);
                if(foundItem)
                {
                    foodItem.current = structuredClone(foundItem); // this will be used for data tracking purposes
                    purgeCustomizations(foundItem);
                    setFoodItem(foundItem);
                    setCustOptions(foundItem.customizations);
                    setPrice(foundItem.price);
                    console.log("ItemViewPage did mount");
                }
                setItemFound(false);
            }
            else
            {
                console.error("not found");
            }
            // TO DO: event listeners and saving state.
        }
        return(
            ()=>
            {
                
                if(item && !editing) purgeCustomizations(item); 
                // reset the selections when the component unmounts
                // but only do this if we're not editing, because shallow copying is a thing.
                console.log("ItemViewPage did unmount");
            }
        )
    }, [URLSearchParams]);

    function handleChange(newPrice: number, newAmountSelected:number, categoryName: string, updatedOptions: {[key:string]:CustomizationOption})
    {
        let totalPrice = 0;
        setPageModified(true);
        const category = custOptions[categoryName];
        console.log(`the total price for the category ${categoryName} is currently $${category.totalPrice}`);
        category.totalPrice = newPrice;
        console.log(`the total price for the category ${categoryName} is now $${category.totalPrice}`);
        let shouldEnableCheckout = true;
        Object.entries(custOptions).forEach(([key, value])=> 
        {
            shouldEnableCheckout = shouldEnableCheckout && !(value.isRequired && value.amountSelected == 0); // once false, can never be true;
            console.log(`the total price for the category ${key} is currently $${value.totalPrice}`);
            totalPrice += value.totalPrice
        }); // have to do this because the children don't handle the price well

        console.log(`the total price is now $${totalPrice}`);
        category.options = updatedOptions;
        category.amountSelected = newAmountSelected;
        const finalPrice = price + totalPrice;
        console.log(`the total price is now $${finalPrice}`);
        setPrice(parseFloat((finalPrice).toFixed(2)));
        setCustOptions({...custOptions});
        setDisableAddItem(!shouldEnableCheckout);
    }
   
    if(!item)
    {
        // some loading animation would be nice.
        if(!itemFound)
        {
            return(<ErrorPage />)
        }
        else
        {
            return(
                <NavBar bottomLabel={'GO BACK'} onClick={()=>{navigate('/')}} disableButton={false}>
                    <Box sx={{
                            display:'flex',
                            flexDirection: 'column',
                            height: height-110,
                            alignSelf: 'center',
                            alignItems: 'center', 
                            justifyContent: 'space-between'
                            }}>
                        <Typography variant='h3' color='error' pt={1} pb={1}>Page not found</Typography>
                    </Box>
                </NavBar>
            )
        }
    }
    else
    {
        return(
                <NavBar bottomLabel={
                    !editing ? `Add to Cart - ${quantity} x $${price.toFixed(2)}` : `Save Changes - ${quantity} x $${price.toFixed(2)}`
                    } onClick={ editing ? handleSaveEdits : handleAddToCart} disableButton={disableAddItem}>
                    <Box display="flex" flexDirection="row" alignContent={'center'}>
                        <IconButton sx={{pr: 3}} size="large" onClick={()=>navigate(parentLocation)}>
                            <ArrowBackIosRounded/>
                        </IconButton>
                        <Breadcrumbs sx={{alignContent: 'center'}} expandText='false'>
                            <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}> Main Menu </Link>{/* Need to link this to the main menu... it's kind of annoying that */}
                            <Link to={parentLocation} style={{textDecoration: 'none', color: 'inherit'}}>{item.parentCategory}</Link>
                            <Typography>
                                {item.name}
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Stack className='customizationStack' spacing={3} pb={'70px'} pt={3}>
                        <Card key={item.name}  elevation={5} sx={{position: 'sticky', display: "flex", flexDirection: 'column', borderRadius: 2, backgroundColor: theme.palette.beige.main}}>
                            <Box sx={{padding:'4px', paddingLeft: 1, paddingRight: 1}}>
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
                                    '&.MuiCardContent-root':
                                    {
                                        padding: '2px'
                                    }
                                    }}>
                                    <Box display='flex' flexDirection={'row'} alignItems={'top'}  justifyContent={'space-between'}>
                                    <ItemDetailsTextArea description={item.description}/>
                                        <Box display='flex' flexDirection='column' textAlign={'right'} >
                                            <Box component='img' height={'auto'} width={150} paddingLeft={1} src={item.image}/>
                                            <Typography margin='4px' fontSize={20} fontWeight={500}>${item.price}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                                <QuantitySelector initial={quantity} min={1} max={10} onChange={setQuantity}/>
                            </Box>
                        </Card>
                        <ImportantInfoCard key={'importantInfoCard'} nutritionalData={item.nutritionalData} allergenData={item.allergens} modalOpen={open} openModal={handleOpen} closeModal={handleClose}/>
                        <Divider key={'contentDivider'} variant='fullWidth' sx={{
                            
                             borderBottomWidth: '10px'}}>
                        <Typography sx={{fontWeight: 500, fontSize: 20, textAlign: 'center'}}>Sides & Customizations</Typography>
                            </Divider>
                        {Object.entries(custOptions).map(([nameKey, category], index)=>
                        (
                            <CategoryCard key={index} 
                                name={nameKey} 
                                category={category!}
                                disableNewSelection={category.amountSelected === category.maxSelectAmount} 
                                onChange={handleChange}/>
                        ))
                        }
                    </Stack>
                </NavBar>
        )
    }
}

export default ItemViewPage
//
//   <CardMedia image={item.largeImage ? item.largeImage : item.image} sx={{height: 175, backgroundSize: item.largeImage ? 'cover' : 'contain'}}/>