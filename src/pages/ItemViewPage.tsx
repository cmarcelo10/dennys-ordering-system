import React from 'react'
import Slamburger from '../types/Slamburger'
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

function shouldGreyOutChoice(cat: CustomizationCategory, cust: CustomizationOption)
{
    if(cat.amountSelected == cat.maxSelectAmount)
    {
        if(!cust.selected)
        {
            return true;
        }
    }
    return false;
}
const ItemViewPage = ()=>
{

    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const itemName = queryParams.get('item');
    const [item, setFoodItem] = React.useState<FoodItem>();
    const [custOptions, setCustOptions] = React.useState<CustomizationCategory[]>([])
    const [price, setPrice] = React.useState(0);

    React.useEffect(()=>{
        const foundItem = HandheldsList.find((entry)=>entry.name === itemName);
        if(foundItem)
        {
            foundItem.customizations.forEach(e => {e.amountSelected = 0; e.customizations.forEach(c => c.selected = false)});
            setFoodItem(foundItem);
            setCustOptions(foundItem.customizations);
            setPrice(foundItem.price);
        }

    }, [itemName]);
    

    const parentLocation = item ? `/browse?category=${encodeURIComponent(item.parentCategory)}` : "/";
    const image = item ? ( item.largeImage ? item.largeImage : item.image) : undefined;
    const updatePrice = () =>
    {
        let newPrice = item!.price;
        custOptions.forEach(option => {
            option.customizations.forEach(customization => {
                if(customization.selected)
                {
                    newPrice+=customization.price;
                }
            })
        });
        
        setPrice(Number.parseFloat(newPrice.toFixed(2)));
    }
    const toggleSelected = (parentIndex: number, childIndex: number, isMutuallyExclusive: boolean) =>
    {
        // whew!
        let newPrice = item!.price;
        console.log(newPrice)
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
                    if(index === childIndex)
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
                        else
                        {
                            console.log(`Attempted to select ${property.name} but too many were selected`);
                        }
                    }
                    return property;
                })
            }
            return element;
        });
        setCustOptions(updated);
        updatePrice(); // this step can't happen until the customizations are updated
    }
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
                                </CardContent>
                            </Box>
                        </Card>
                        {item!.customizations!.map((element, index)=>
                        (
                            <Card key={index} sx={{backgroundColor: "#F2EEEA"}}>
                                <CardHeader sx={{
                                    fontWeight: 500, 
                                    '& .MuiCardHeader-root': 
                                    {
                                        p: '2px', 
                                        pl: 1, 
                                        pr: 1,
                                    }
                                }} title={
                                    <Typography variant='h4' fontSize={20} fontWeight={500}>
                                    {element.name}
                                    </Typography>}/>
                                <Divider/>
                                <CardContent sx={{
                                    '&.MuiCardContent-root':
                                    {
                                        m: '5px',
                                        p: 0,
                                    }
                                }}>
                                    <Box display='flex' flexDirection={'column'}>
                                        {element.customizations.map((customization, keyValue)=>
                                            (
                                                <>
                                                <Box key={keyValue} display='flex' alignContent='center' flexDirection='row' justifyContent = 'space-between' bgcolor={customization.selected ? theme.palette.dennysYellow.main : 'none'}
                                                    onClick={()=>{toggleSelected(index, keyValue, customization.isMutuallyExclusive)}}
                                                    borderColor={theme.palette.dennysGrey.main} width={'100%'} 
                                                    sx={{
                                                        borderBox: 'content-box',
                                                        fontSize: 16,
                                                        }}>
                                                    <Box display='flex' flexDirection='row' alignItems='center' m={1}>

                                                        {customization.selected ? (
                                                            <TaskAltRoundedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: 'black'}} />
                                                        ):(
                                                            <RadioButtonUncheckedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: shouldGreyOutChoice(element, customization) ? theme.palette.text.disabled : undefined}} />
                                                        ) }

                                                        <Typography color={shouldGreyOutChoice(element, customization) ? theme.palette.text.disabled : undefined} fontSize={16} alignSelf='center' pl={0.25} fontWeight={ customization.selected? 500 : undefined}>{customization.name}</Typography>
                                                    </Box>
                                                    <Typography color={shouldGreyOutChoice(element, customization) ? theme.palette.text.disabled : undefined} fontSize='inherit'  alignSelf='center' pr={2} fontWeight={ customization.selected? 500 : undefined}>
                                                        {customization.price > 0 ? (<>+ ${customization.price}</>):(<></>)}
                                                    </Typography>
                                                </Box>
                                                <Divider/>
                                                </>
                                            )
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                 </NavBar>
            </ThemeProvider>
        )
    }
}
export default ItemViewPage