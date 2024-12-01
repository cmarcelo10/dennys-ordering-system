import FoodItem from "./FoodItem.ts";
import CustomizationCategory from "./CustomizationCategory.ts";
import SlamburgerSmall from '../assets/food/Slamburger.jpg'
import SlamburgerLarge from '../assets/food/Slamburger.png'
import GardenSaladSide from "./GardenSaladSide.ts";

export const EggStyleOptions:CustomizationCategory =
{
    name: "Egg Style",
    isRequired: true,
    optionsAreMutuallyExclusive:false,
    customizations: {
        "Over Easy": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Over Medium": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Over Hard": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Scrambled": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Soft Poached": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Medium Poached": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
        "Hard Poached": 
        {
            price: 0, 
            selected: false,
            parentCategory: "Egg Style"
        },
    },
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const BurgerPattyOptions:CustomizationCategory = 
{
    name: "Substitute Burger Patty",
    isRequired: false,
    optionsAreMutuallyExclusive: true,
    customizations: {
        "Beyond Meat Patty": {price: 4.98, selected: true, parentCategory: "Substitute Burger Patty"},
        "Crispy Chicken Breast": {price: 0, selected: true, parentCategory: "Substitute Burger Patty"},
        "Grilled Seasoned Chicken Breast": {price: 0, selected: true, parentCategory: "Substitute Burger Patty"},
    },
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const BurgerFillingOptions:CustomizationCategory = 
{
    name: "Extras",
    label: "Add Extra Fillings",
    isRequired: false,
    customizations: {
        "Aged White Cheddar Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
        "Canadian Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
        "Swiss Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
        "Bacon": {price: 2.29, selected: false, parentCategory: "Extras"},
        "Sauteed Mushrooms": {price: 2.29, selected: false, parentCategory: "Extras"},
        "Avocado": {price: 2.29, selected: false, parentCategory: "Extras"},
    },
    optionsAreMutuallyExclusive: false,
    maxSelectAmount: 4,
    amountSelected: 0,
}

export const SlamburgerSideOptions:CustomizationCategory = 
{
    name: "Side",
    label: "Select a Side",
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    maxSelectAmount: 1,
    amountSelected: 0,
    customizations:
    {
        "Hash Browns":{price: 0, selected: false, parentCategory: "Extras"},
        "French Fries":{price: 0, selected: false, parentCategory: "Extras"},
        "Seasonal Fruit":{price: 2.39, selected: false, parentCategory: "Extras"},
        "Seasoned Fries":{price: 2.39, selected: false, parentCategory: "Extras"},
        "Onion Rings":{price: 2.39, selected: false, parentCategory: "Extras"},
        "Bacon Cheddar Tots (6pcs)":{price: 2.39, selected: false, parentCategory: "Extras"},
        "Smothered Fries":{price: 4.39, selected: false, parentCategory: "Extras"},
        "Poutine":{price: 4.39, selected: false, parentCategory: "Extras"},
    },
}

export const SauceOptions:CustomizationCategory = 
{
    name: "Sauce",
    isRequired: false,
    optionsAreMutuallyExclusive: false,
    customizations: {
        "Brown Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Country Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Turkey Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Pepperjack Cheese Sauce (Queso)": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Hollandaise Sauce": {price: 1.99, selected: false, parentCategory: "Sauce"},
    },
    amountSelected: 0,
    maxSelectAmount: 5,
}

export const SideSaladOptions:CustomizationCategory = {
    name: "Garden Salad",
    isRequired: false,
    customizations: {"Add Garden Salad":{price: 4.29, selected: false, parentCategory: "Garden Salad"}},
    maxSelectAmount: 1,
    amountSelected: 0,
    optionsAreMutuallyExclusive: false,
    // Really terrible workaround for the implementation
}

export const SlamburgerCustomizations: CustomizationCategory[] = [
    EggStyleOptions, BurgerPattyOptions, BurgerFillingOptions, SlamburgerSideOptions, SauceOptions, SideSaladOptions, 
]

const Slamburger:FoodItem = 
{
    name: 'Slamburger',
    description: "Crispy hash browns, a fresh egg made to order, bacon and Canadian cheese stacked high on a brioche bun.",
    price: 19.99,
    image: SlamburgerSmall,
    largeImage: SlamburgerLarge,
    url: 'slamburger', // this is the URI-encoded name
    customizations: SlamburgerCustomizations,
    salad: GardenSaladSide,
}

export default Slamburger