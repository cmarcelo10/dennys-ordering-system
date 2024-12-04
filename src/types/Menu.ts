import Category from "./Category"
import FoodItem from "./FoodItem"
import SlamburgerImage from "../assets/Food/Slamburger.png"
import { HandheldsMenu } from "./HandheldsMenu"
interface Menu {
    [key: string]: Category
}

export const Menu:Menu = {
    "Featured": {
        name: 'Featured', 
        image: SlamburgerImage
    },
    "Deals and Promos": {
        name: 'Deals and Promos', 
        image: SlamburgerImage
    },
    "Appetizers": {
        name: 'Appetizers', 
        image: SlamburgerImage
    },
    "Drinks and Shakes": {
        name: 'Drinks and Shakes', 
        image: SlamburgerImage
    },
    "Shareable Starters": {
        name: 'Shareable Starters', 
        image: SlamburgerImage
    },
    "Sandwiches and Burgers": {
        name: 'Drinks and Shakes', 
        image: SlamburgerImage,
        items: HandheldsMenu,
    },
    "Savoury Omlettes": {
        name: 'Savoury Omelettes', 
        image: SlamburgerImage
    },
    "Premium Pancakes": {
        name: 'Premium Pancakes', 
        image: SlamburgerImage
    },
    "Entrées": {
        name: "Entrées",
        image: SlamburgerImage,
    },
    "Signature Breakfasts": {
        name: 'Signature Breakfasts', 
        image: SlamburgerImage
    },
}

// menu
// [key: string]
//  ---- [key: string]