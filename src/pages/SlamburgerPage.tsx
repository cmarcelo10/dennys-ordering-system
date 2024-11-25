import React from 'react'
import Slamburger from '../types/Slamburger'
import NavBar from '../components/Navbar'
import FoodItem from '../types/FoodItem'
import CustomizationCategory from '../types/CustomizationCategory'
import CustomizationOption from '../types/CustomizationOption'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbNode from '../types/BreadcrumbNode'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
// Later problem: lifting the state up to the parent.
interface ItemViewPageProps
{
    foodItem: FoodItem,
    path: BreadcrumbNode[], // make sure this is in order.
    isEditing: boolean, // if the page is being opened in "edit" mode.
}
// The cart object will only save the "selected" parameters of the item. 
// This involves manipulating the context, but I'm not quite familiar with context at the moment.
type CustomizationGroup = 
{
    price: number,
    customizations: CustomizationOption[],
}

type FoodOrder = 
{
    price: number,
    customizations: CustomizationGroup[],
    includesSideSalad: boolean,
    quantity: number,
}

const ItemViewPage = ({foodItem, path, isEditing}:ItemViewPageProps)=>
{
    // Pass in the food items prop
    // set the initial state to be the "unset" food item
    // call "useEffect" to change the page contents when "editing" is enabled, so that
    // the previous selections are loaded.
    
    const [foodOrder, setFoodOrder] = React.useState<FoodOrder>({price: 0, customizations: [], includesSideSalad: false, quantity: 1})
    const [pathArray, setPathArray] = React.useState<BreadcrumbNode[]>([]);
    React.useEffect(()=>{
        setPathArray(path.sort((a, b)=>{return(a.index-b.index)}));
    },[]);
    return (
        <NavBar bottomLabel={"Add to Cart"}>
            <Breadcrumbs>
                {path.map((item, index)=>(
                    <Typography>
                        <Link to={item.path}>{item.label}</Link>
                    </Typography>
                    ))
                }
            </Breadcrumbs>
        </NavBar>

    )

}
export default ItemViewPage