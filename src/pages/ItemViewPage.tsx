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
import { Box, Button, createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme();
// Later problem: lifting the state up to the parent.

// The cart object will only save the "selected" parameters of the item. 
// This involves manipulating the context, but I'm not quite familiar with context at the moment.


const ItemViewPage = ()=>
{
    const navigate = useNavigate();
    const {name} = useParams<{name: string}>();
    const [foodItem, setFoodItem] = React.useState<FoodItem | null>(null);
    React.useEffect(()=>{
        console.log(`name = ${name}`);
        const foundItem = HandheldsList.find((item)=>item.name === name);
        if(foundItem !== null)
        {
            setFoodItem(foundItem!);
        }
    }, [name])

    const goHome = ()=>{
        navigate('/');
    }

    if(foodItem === null)
    {
        return
        (<ThemeProvider theme={theme}>
            <NavBar bottomLabel={'Add to Cart'}>
                {(foodItem === undefined) ? (
                <Box>
                    <Typography variant='h2' color={theme.palette.primary.main}>
                        This page hasn't been implemented.
                    </Typography>
                    <Button onClick={goHome}>Go To Main Menu</Button>
                </Box>
                ):
                (
                    <Breadcrumbs>
    
                    </Breadcrumbs>
                )
            }
            </NavBar>
            </ThemeProvider>
        )
    }
    else
    {
        return(
            <ThemeProvider theme={theme}>
            <NavBar bottomLabel={'Add to Cart'}>
                {(foodItem === undefined) ? (
                <Box>
                    <Typography variant='h2' color={theme.palette.primary.main}>
                        This page hasn't been implemented.
                    </Typography>
                    <Button onClick={goHome}>Go To Main Menu</Button>
                </Box>
                ):
                (
                    <Breadcrumbs>
    
                    </Breadcrumbs>
                )
            }
            </NavBar>
            </ThemeProvider>
        )
    }

}
export default ItemViewPage