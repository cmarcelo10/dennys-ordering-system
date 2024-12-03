import FoodItem from "./FoodItem.ts";
import CustomizationCategory from "./CustomizationCategory.ts";
import SlamburgerSmall from '../assets/food/Slamburger.jpg'
import SlamburgerLarge from '../assets/food/Slamburger.png'
import GardenSaladSide, {SideSaladOptions} from "./GardenSaladSide.ts";

export const EggStyleOptions:CustomizationCategory =
{
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    label: "Choose Your Egg Style",
    options: {
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
    totalPrice: 0,
}

export const BurgerPattyOptions:CustomizationCategory = 
{
    label: "Substitute Burger Patty?",
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    options: {
        "No thanks": {price: 0, selected: false, parentCategory: "BurgerPatty"},
        "Crispy Chicken Breast": {price: 0, selected: false, parentCategory: "Burger Patty"},
        "Grilled Seasoned Chicken Breast": {price: 0, selected: false, parentCategory: "Burger Patty"},
        "Beyond Meat Patty": {price: 4.98, selected: false, parentCategory: "Burger Patty"},
    },
    maxSelectAmount: 1,
    amountSelected: 0,
    totalPrice: 0,
}

export const BurgerFillingOptions:CustomizationCategory = 
{
    label: "Add Extra Fillings",
    isRequired: false,
    options: {
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
    totalPrice: 0,
}

export const SlamburgerSideOptions:CustomizationCategory = 
{
    label: "Select a Side",
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    maxSelectAmount: 1,
    amountSelected: 0,
    totalPrice: 0,
    options:
    {
        "Hash Browns":{price: 0, selected: false, parentCategory: "Side"},
        "French Fries":{price: 0, selected: false, parentCategory: "Side"},
        "Seasonal Fruit":{price: 2.39, selected: false, parentCategory: "Side"},
        "Seasoned Fries":{price: 2.39, selected: false, parentCategory: "Side"},
        "Onion Rings":{price: 2.39, selected: false, parentCategory: "Side"},
        "Bacon Cheddar Tots (6pcs)":{price: 2.39, selected: false, parentCategory: "Side"},
        "Smothered Fries":{price: 4.39, selected: false, parentCategory: "Side"},
        "Poutine":{price: 4.39, selected: false, parentCategory: "Side"},
    },
}

export const SauceOptions:CustomizationCategory = 
{
    label: "Add Sauce",
    isRequired: false,
    optionsAreMutuallyExclusive: false,
    options: {
        "Brown Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Country Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Turkey Gravy": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Pepperjack Cheese Sauce (Queso)": {price: 1.99, selected: false, parentCategory: "Sauce"},
        "Hollandaise Sauce": {price: 1.99, selected: false, parentCategory: "Sauce"},
    },
    amountSelected: 0,
    maxSelectAmount: 5,
    totalPrice: 0,
}

export const SlamburgerCustomizations = 
{
    "Side": SlamburgerSideOptions,
    "Egg Style": EggStyleOptions,
    "Burger Patty": BurgerPattyOptions,
    "Extras": BurgerFillingOptions,
    "Sauce": SauceOptions,
    "Side Salad": SideSaladOptions,
}

const Slamburger:FoodItem = 
{
    name: 'Slamburger',
    parentCategory: "Sandwiches and Burgers",
    description: "Crispy hash browns, a fresh egg made to order, bacon and Canadian cheese stacked high on a brioche bun.",
    price: 18.59,
    image: SlamburgerSmall,
    largeImage: SlamburgerLarge,
    nutritionalData: {
        name: "Slamburger",
        calories: "1090",
        fat: "73.6 g",
        saturated_fat: "27.9 g",
        trans_fat: "1.3 g",
        cholesterol: "212 mg",
        sodium: "2106 mg",
        carbohydrates: "55.4 g",
        fibre: "11.6 g",
        sugar: "7.7 g",
        protein: "53.6 g",
    },
    allergens: "Eggs, Dairy, Gluten",
    url: 'slamburger', // this is the URI-encoded name
    customizations: SlamburgerCustomizations,
    salad: GardenSaladSide,
}

export default Slamburger