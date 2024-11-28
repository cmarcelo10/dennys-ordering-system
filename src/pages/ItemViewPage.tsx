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
    const [itemNutrition, setItemNutrition] = React.useState<NutritionalData | null>(null);
    React.useEffect(()=>{
        console.log(`name = ${name}`);
        const foundItem = HandheldsList.find((item)=>item.name === name);
        if(foundItem !== null)
        {
            setFoodItem(foundItem!);
        }
        const foundNutritionItem = NutritionalDataTable.find((nutritionItem)=>nutritionItem.name === name)
        if(foundNutritionItem !== null)
        {
            setItemNutrition(foundNutritionItem!);
        }
    }, [name])


    // Temporary style for the popup box.
    const popupStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const goHome = ()=>{
        navigate('/');
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

            <Button onClick={handleOpen}>Nutritional Data</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="nutrition-data-popup" aria-describedby="nutrition-data-popup-desc">
            
            
            {(itemNutrition === undefined) ? (
                    <Box sx={popupStyle}>
                    <Typography id="nutrition-data-popup" variant="h6" component="h2">
                        No Nutrition Data Available
                    </Typography>
                    <Typography id="nutrition-data-popup-desc" sx={{ mt: 2 }}>
                    </Typography>
                    </Box>
                ):(
                    <Box sx={popupStyle}>
                    <Typography id="nutrition-data-popup" variant="h6" component="h2">
                        {name} Nutritional Data
                    </Typography>
                    <Typography id="nutrition-data-popup-desc" sx={{ mt: 2 }}>
                        Filler for now  
                    </Typography>
                    </Box>
                )
            }
            
            </Modal>
            </ThemeProvider>
        )
    }

}
export default ItemViewPage