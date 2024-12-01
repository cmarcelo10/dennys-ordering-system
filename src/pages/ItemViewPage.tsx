import React from 'react'
import Modal from '@mui/material/Modal'
import Slamburger from '../types/Slamburger'
import Allergen from '../types/AllergenData'
import { AllergenDataTable } from '../types/AllergenData'
import NutritionalData from '../types/NutritionalData'
import { NutritionalDataTable } from '../types/NutritionalData'
import NavBar from '../components/Navbar'
import FoodItem from '../types/FoodItem'
import CustomizationCategory from '../types/CustomizationCategory'
import CustomizationOption from '../types/CustomizationOption'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbNode from '../types/BreadcrumbNode'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import HandheldsMenu from './CategoryMenu'
import { HandheldsList } from '../types/MenuItems'
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, createTheme, Divider, IconButton, Stack, Table, ThemeProvider, useTheme } from '@mui/material'
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded'
import ErrorPage from "../components/ErrorPage"
import theme from '../styles/Theme.ts'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { Immer } from 'immer'
import { CardGiftcard } from '@mui/icons-material'
import CategoryCard from '../components/CateogryCard.tsx'
// Later problem: lifting the state up to the parent.

// The cart object will only save the "selected" parameters of the item. 
// This involves manipulating the context, but I'm not quite familiar with context at the moment.
const imageDimensions =
{
    width: 112.5,
    height: 112.5,
}

const ItemDetailsTextArea = ({description}:{description: string | undefined}) =>
(
    <Typography fontSize={14}  sx={
        {
            textAlign: 'justify', 
            textJustify: 'justify', 
            padding: '4px', 
            maxLines: 4, overflow: 
            'hidden', paddingTop: 0}
        } variant='body1' 
        color="black">
            {description}
    </Typography>
);

const ItemViewPage = ()=>
{
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const itemName = queryParams.get('item');
    const [item, setFoodItem] = React.useState<FoodItem>(); // Adding the types 
    const [custOptions, setCustOptions] = React.useState<CustomizationCategory[]>([])
    const [price, setPrice] = React.useState<number>(0);
    const [sideSaladSelected, setSideSaladSelected] = React.useState<boolean>(false);
    React.useEffect(()=>{
        // useEffect is usually used for handling external events, but in this case
        // I use it to prevent this initialization from happening every time.
        const foundItem = HandheldsList.find((entry)=>entry.name === itemName);
        if(foundItem)
        {
            foundItem.customizations.forEach(e => 
                {
                    e.amountSelected = 0;
                    Object.values(e.customizations).forEach(c => c.selected = false)
                });
            setFoodItem(foundItem);
            setCustOptions(foundItem.customizations);
            setPrice(foundItem.price);
        }
    
    }, [item]);
    
    const parentLocation = item ? `/browse?category=${encodeURIComponent(item.parentCategory)}` : "/";
    const image = item ? ( item.largeImage ? item.largeImage : item.image) : undefined;
    const updatePrice = () =>
    {
        let newPrice = item!.price;
        custOptions.forEach(option => {
            Object.values(option.customizations).forEach((customization)=>
            {
                if(customization.selected)
                {
                    newPrice+=customization.price;
                }
            })
        });
        // JavaScript isn't great at floating point arithmetic
        // This is good enough for a demo implementation.
        setPrice(Number.parseFloat(newPrice.toFixed(2)));
    }
    const toggleSelected = ()=>
    {
        const parentCateogyr
    }
    const toggleSelected = React.useCallback((parentIndex: number, childIndex: number, isMutuallyExclusive: boolean) =>
    {
        // whew!
        const updated = custOptions.map((element, parentKey) => 
        { 
            if(parentKey === parentIndex)
            {
                element.customizations = element.customizations.map((property, index) =>
                {
                    if(isMutuallyExclusive)
                    {
                        if(property.selected) // avoid redrawing elements that haven't changed.
                        {
                            property.selected = false;
                        }
                        if(index === childIndex)
                        {
                            property.selected = !property.selected;
                        }
                        return property
                    }
                    else if(index === childIndex)
                    {
                        if(property.index !== 1028) // side salad is 1028
                        {
                            if(!property.selected && element.amountSelected < element.maxSelectAmount)
                            {
                                element.amountSelected++;
                                property.selected = true;
                            }
                            else if(property.selected)
                            {
                                property.selected = false
                                element.amountSelected--;
                            }
                        }
                        else
                        {
                            property.selected = !property.selected;
                            setSideSaladSelected(property.selected);
                        }
                    }
                    return property;
                });
            }
            return element;
        });
        setCustOptions(updated);
        updatePrice(); 
        // Performing this calculation prior to updating the item's state will show the incorrect price
    }, [custOptions]);
    if(item === undefined || item === null)
    {
        return(<ErrorPage />)
    }
    else
    {
        return(
            <ThemeProvider theme={theme}>
                <NavBar bottomLabel={`Add to Cart - $${price}`}>
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
                    <Stack className='customizationStack' spacing={3} pb={'70px'}>
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
                                    <ItemDetailsTextArea description={item.description}/>
                                        <Box display='flex' flexDirection='column' textAlign={'right'} >
                                            <Box component='img' height={130} width={'auto'} paddingLeft={1} borderColor={'black'} src={image}/>
                                            <Typography margin='4px' fontSize={20} fontWeight={500}>${item.price}</Typography>
                                        </Box>
                                    </Box>

                                    {/* allergy and nutritional stuff would go here */}

                                </CardContent>
                            </Box>
                        </Card>
                        {item!.customizations!.map((element, itemIndex)=>
                            (<CategoryCard key={itemIndex} category={element!} itemSelectionHandler={toggleSelected} />))
                        }
                    </Stack>
                 </NavBar>
            </ThemeProvider>
        )
    }
}
export default ItemViewPage