import FoodItem from "./FoodItem.ts";
import CustomizationCategory from "./CustomizationCategory.ts";
import SlamburgerSmall from '../assets/food/Slamburger.jpg'
import SlamburgerLarge from '../assets/food/Slamburger.png'
import GardenSaladSide, {SideSaladOptions} from "./GardenSaladSide.ts";
export const EggStyleOptions:CustomizationCategory =
{
    // adding the 
    index: 0,
    name: "Egg Style",
    isRequired: true,
    customizations: [
        {index: 0.1, name: "Over Easy", price: 0, isMutuallyExclusive: true},
        {index: 0.2, name: "Over Medium", price: 0, isMutuallyExclusive: true},
        {index: 0.3, name: "Over Hard", price: 0, isMutuallyExclusive: true},
        {index: 0.4, name: "Scrambled", price: 0, isMutuallyExclusive: true},
        {index: 0.5, name: "Soft Poached", price: 0, isMutuallyExclusive: true},
        {index: 0.6, name: "Medium Poached", price: 0, isMutuallyExclusive: true},
        {index: 0.7, name: "Hard Poached", price: 0, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const BurgerPattyOptions:CustomizationCategory = 
{
    index: 1,
    name: "Substitute Burger Patty",
    isRequired: false,
    customizations: [
        {index: 1.1, name: "Beyond Meat Patty", price: 4.98, isMutuallyExclusive: true},
        {index: 1.2, name: "Crispy Chicken Breast", price: 0, isMutuallyExclusive: true},
        {index: 1.3, name: "Grilled Seasoned Chicken Breast", price: 0, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const BurgerFillingOptions:CustomizationCategory = 
{
    index: 2,
    name: "Extras",
    label: "Add Extra Fillings",
    isRequired: false,
    customizations: [
        {index: 2.1, name: "Aged White Cheddar Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.2, name: "Canadian Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.3, name: "Swiss Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.4, name: "Bacon", price: 2.29, isMutuallyExclusive: false},
        {index: 2.5, name: "Sauteed Mushrooms", price: 2.29, isMutuallyExclusive: false},
        {index: 2.6, name: "Avocado", price: 2.29, isMutuallyExclusive: false},
    ],
    maxSelectAmount: 4,
    amountSelected: 0,
}

export const SideOptions:CustomizationCategory = 
{
    index: 2,
    name: "Side",
    isRequired: true,
    customizations: [
        {index: 3.1, name: "Hash Browns", price: 0, isMutuallyExclusive: true},
        {index: 3.2, name: "French Fries", price: 0, isMutuallyExclusive: true},
        {index: 3.3, name: "Seasonal Fruit", price: 2.39, isMutuallyExclusive: true},
        {index: 3.4, name: "Seasoned Fries", price: 2.39, isMutuallyExclusive: true},
        {index: 3.5, name: "Onion Rings", price: 2.39, isMutuallyExclusive: true},
        {index: 3.6, name: "Bacon Cheddar Tots (6pcs)", price: 3.49, isMutuallyExclusive: true},
        {index: 3.7, name: "Smothered Fries", price: 4.39, isMutuallyExclusive: true},
        {index: 3.8, name: "Poutine", price: 4.69, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const SauceOptions:CustomizationCategory = 
{
    index: 3,
    name: "Sauce",
    isRequired: false,
    customizations: [
        {name: "Brown Gravy", price: 1.99, isMutuallyExclusive: false},
        {name: "Country Gravy", price: 1.99, isMutuallyExclusive: false},
        {name: "Turkey Gravy", price: 1.99, isMutuallyExclusive: false},
        {name: "Pepperjack Cheese Sauce (Queso)", price: 1.99, isMutuallyExclusive: false},
        {name: "Hollandaise Sauce", price: 1.99, isMutuallyExclusive: false},
    ],
    maxSelectAmount: 5,
    amountSelected: 0,
}


export const SlamburgerCustomizations: CustomizationCategory[] = [
    EggStyleOptions, BurgerPattyOptions, BurgerFillingOptions, SideOptions, SauceOptions, SideSaladOptions, 
]

const Slamburger:FoodItem = 
{
    name: 'Slamburger',
    parentCategory: "Sandwiches and Burgers",
    description: "Crispy hash browns, a fresh egg made to order, bacon and Canadian cheese stacked high on a brioche bun.",
    price: 18.59,
    image: SlamburgerSmall,
    largeImage: SlamburgerLarge,
    url: 'slamburger', // this is the URI-encoded name
    customizations: SlamburgerCustomizations,
    salad: GardenSaladSide,
}

export default Slamburger