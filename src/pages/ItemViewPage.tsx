import React from 'react'
import NavBar from '../components/NavBar/Navbar.tsx'
import FoodItem from '../types/FoodItem'
import CustomizationCategory from '../types/CustomizationCategory'
import CustomizationOption from '../types/CustomizationOption'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link, useNavigate, useSearchParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { HandheldsList } from '../types/HandheldsMenu.ts'

import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Skeleton, Stack, Table, ThemeProvider, useTheme } from '@mui/material'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'
import ErrorPage from "../components/ErrorPage"
import theme from '../styles/Theme.ts'
import CategoryCard from '../components/ItemViewPage/CategoryCard.tsx'
import ImportantInfoCard from '../components/ItemViewPage/ImportantInfoCard.tsx'
import { CartContext } from '../contexts/CartContext.tsx'
import CartItem from '../types/CartItem.ts'
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
interface WarningDialogProps
{
    open: boolean, 
    onClose: ()=>void,
    onConfirm: ()=> void,
}
const WarningDialog = ({open, onConfirm, onClose}: WarningDialogProps)=>
{
    return(
        <Dialog open={open}>
            <DialogTitle>
                <Typography variant='h6'>
                    Unsaved Changes
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant='body1'>
                   If you go back, your changes won't be kept.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='contained' color='primary'>
                    Stay
                </Button>
                <Button onClick={onConfirm} variant='contained' color='error'>
                    Leave
                </Button>
            </DialogActions>
        </Dialog>
    )
}
const ItemViewPage = ()=>
{
    const {height, width} = WindowDimensions();
    const [pageModified, setPageModified] = React.useState(false); // to track whether the user has changed parts of the page
    const navigate = useNavigate();
    const originalSelections = React.useRef<Customizations>({});
    const {cartItems, addToCart, saveToCart} = React.useContext(CartContext);
    const menu = React.useRef(HandheldsList);
    const [editing, setEditing] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams(window.location.search));
    const isSaving = React.useRef(false);
    const [cartItem, setCartItem] = React.useState<CartItem>();
    const [itemFound, setItemFound] = React.useState(true);
    const [item, setFoodItem] = React.useState<FoodItem | undefined>(() =>
    {
        const queryParams = new URLSearchParams(window.location.search);
        if(queryParams && queryParams.has('item'))
        {
            const itemName = queryParams.get('item');
            if(itemName)
            {
                const decodedName = decodeURIComponent(itemName);
                const foundItem = HandheldsList.find((entry)=>entry.name === decodedName);
                if(foundItem) purgeCustomizations(foundItem!);
                return foundItem;
            }
        }
        return undefined
    });
    const [custOptions, setCustOptions] = React.useState<Customizations>(item ? item.customizations : {})
    const [price, setPrice] = React.useState(item ? item.price : 0);
    const basePrice = React.useRef(0);
    const [quantity, setQuantity] = React.useState(1); 
    const [sideSaladSelected, setSideSaladSelected] = React.useState<boolean>(false); // future to do
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [parentLocation, setParentLocation] = React.useState(item ? `/browse?category=${encodeURIComponent(item.parentCategory)}` : "/");
    const [disableAddItem, setDisableAddItem] = React.useState(true);
    // Minor performance optimization so that React doesn't re-create this function object on re-renders
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const warnBeforeUnload = React.useCallback(function warnBeforeReload(event: BeforeUnloadEvent)
    {
        window.sessionStorage.setItem("isReload", "true");
        if(pageModified)
        {
            event.preventDefault();
            event.returnValue = ""; // deprecated, but necessary
        }
    }, [pageModified]);

    function handleAddToCart()
    {
        if(!isSaving.current)
        {
            isSaving.current = true;
            if(item)
            {
                let foodItemCopy =  structuredClone(item);
                foodItemCopy.customizations = structuredClone(custOptions);
                addToCart({id: '', item: foodItemCopy, price: price, quantity: quantity});
                navigate(`/browse?category=${encodeURIComponent(item.parentCategory)}`, {state:{
                    itemAdded: true,
                    itemName: item.name
                }})
            }
        }
        return;
    }

    function handleGoBack()
    {
        setDialogOpen(true);
    }

    function handleCancelEdits()
    {
        cartItem!.item.customizations = originalSelections.current;
        navigate('/cart', {state: {cancelled: true}});
    }

    function handleSaveEdits()
    {
        if(isSaving.current) return;
            isSaving.current = true
            if(cartItem)
            {
                cartItem.item.customizations = custOptions;
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
        const searchParams = new URLSearchParams(window.location.search);
        const itemName = searchParams.get('item');
        const cartItemID = searchParams.get('id');
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
                setQuantity(foundCartItem.quantity); // primitive
                setCustOptions(foundCartItem.item.customizations);
                setCartItem(foundCartItem);
                setDisableAddItem(false);
                originalSelections.current = structuredClone(foundCartItem.item.customizations); // preserve the state of the original changes. Needs to be a clone.
                setEditing(true);
            }
        }
        if(item)
        {
            setParentLocation(item.parentCategory)
        }
        else if(item || itemName)
        {
            const foundItem = menu.current.find((entry)=>entry.name === itemName);
            if(foundItem)
            {
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
        
        return(
            ()=>
            {
                
                if(item && !editing) purgeCustomizations(item); 
                // reset the selections when the component unmounts
                // but only do this if we're not editing, because shallow copying is a thing.
                console.log("ItemViewPage did unmount");
            }
        )
    }, [window.location.search]);

    function handleChange(newPriceOfCategory: number, newAmountSelected:number, categoryName: string, updatedOptions: {[key:string]:CustomizationOption})
    {
        setPageModified(true);
        const category = custOptions[categoryName];
        console.log(`the total price for the category ${categoryName} is currently $${category.totalPrice}`);
        category.totalPrice = newPriceOfCategory,
        console.log(`the total price for the category ${categoryName} is now $${category.totalPrice}`);
        let shouldEnableCheckout = true;
        function reducer(updatedPrice: number, category: CustomizationCategory)
        {
            shouldEnableCheckout = shouldEnableCheckout && !(category.isRequired && category.amountSelected == 0); 
            console.log(`Price is ${category.totalPrice}`)
            updatedPrice+= category.totalPrice;
            console.log(`Updated Price is ${updatedPrice}`);
            return updatedPrice;
        }
        const totalPrice= Object.values(custOptions).reduce(reducer, 0);
         // have to do this because the children don't handle the price well

        console.log(`the total price is now $${totalPrice}`);
        category.options = updatedOptions;
        category.amountSelected = newAmountSelected;
        let finalPrice = 0;
        if(editing)
        {
            finalPrice = basePrice.current + totalPrice;
        }
        else finalPrice = price + totalPrice;
        console.log(`the total price is now $${finalPrice}`);
        setPrice(parseFloat((finalPrice).toFixed(2)));
        setCustOptions({...custOptions});
        setDisableAddItem(!shouldEnableCheckout);
    }
    function goToParent()
    {
        navigate(`/browse?category=${encodeURIComponent(item!.parentCategory)}`);
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
                    !editing ? `Add to Cart - ${quantity} x $ ${price.toFixed(2)}` : `Save Changes - ${quantity} x $${price.toFixed(2)}`
                    } onClick={ editing ? handleSaveEdits : handleAddToCart} disableButton={disableAddItem}>
                    <WarningDialog open={dialogOpen} onClose={()=>setDialogOpen(false)} onConfirm={handleCancelEdits}/>
                    <Box display="flex" flexDirection="row" alignContent={'center'}>
                        <IconButton sx={{pr: 3}} size="large" onClick={editing ? handleGoBack : goToParent} title={editing ? "Cancel" : undefined}>
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
                                        <Box display='flex' flexDirection='column' textAlign={'right'}>
                                            <Box component='img' maxHeight={158} height={'auto'} width={150} paddingLeft={1} src={item.image}/>
                                            <Typography margin='4px' fontSize={20} fontWeight={500}>$ {item.price}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                                <QuantitySelector initial={quantity} min={1} max={10} onChange={setQuantity}/>
                            </Box>
                        </Card>
                        <ImportantInfoCard key={'importantInfoCard'} nutritionalData={item.nutritionalData} allergenData={item.allergens} allergenFontSize={item.allergenFontSize} modalOpen={open} openModal={handleOpen} closeModal={handleClose}/>
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