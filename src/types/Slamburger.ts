import FoodItem from "./FoodItem.ts";
import CustomizationCategory from "./CustomizationCategory.ts";
import SlamburgerSmall from '../assets/food/Slamburger.jpg'
import SlamburgerLarge from '../assets/food/Slamburger.png'
import GardenSaladSide from "./GardenSaladSide.ts";

export const EggStyleOptions:CustomizationCategory =
{
    // adding the 
    index: 0,
    name: "Egg Style",
    isRequired: true,
    customizations: [
        {index: 0.1, name: "Over easy", price: 0, isMutuallyExclusive: true},
        {index: 0.2, name: "Over medium", price: 0, isMutuallyExclusive: true},
        {index: 0.3, name: "Over hard", price: 0, isMutuallyExclusive: true},
        {index: 0.4, name: "Scrambled", price: 0, isMutuallyExclusive: true},
        {index: 0.5, name: "Soft poached", price: 0, isMutuallyExclusive: true},
        {index: 0.6, name: "medium poached", price: 0, isMutuallyExclusive: true},
        {index: 0.7, name: "hard poached", price: 0, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
}

export const BurgerPattyOptions:CustomizationCategory = 
{
    index: 1,
    name: "Substitute Burger Patty",
    isRequired: false,
    customizations: [
        {index: 1.1, name: "Beyond Meat Patty GF", price: 4.98, isMutuallyExclusive: true},
        {index: 1.2, name: "Over medium", price: 0, isMutuallyExclusive: true},
        {index: 1.3, name: "Over hard", price: 0, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
}

export const BurgerFillingOptions:CustomizationCategory = 
{
    index: 2,
    name: "Burger Fillings",
    isRequired: false,
    customizations: [
        {index: 2.1, name: "Aged White Cheddar Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.2, name: "Canadian Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.3, name: "Swiss Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 2.4, name: "Scrambled", price: 2.29, isMutuallyExclusive: false},
        {index: 2.5, name: "Bacon", price: 2.29, isMutuallyExclusive: false},
        {index: 2.6, name: "Sauteed Mushrooms", price: 2.29, isMutuallyExclusive: false},
        {index: 2.7, name: "Avocado", price: 2.29, isMutuallyExclusive: false},
    ],
    maxSelectAmount: 1,
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
}

export const SauceOptions:CustomizationCategory = 
{
    index: 3,
    name: "Sauce",
    isRequired: false,
    customizations: [
        {name: "Brown Gravy", price: 1.99, isMutuallyExclusive: false},
        {name: "Country Gravy", price: 1.99, isMutuallyExclusive: true},
        {name: "Turkey Gravy", price: 1.99, isMutuallyExclusive: true},
        {name: "Pepperjack Cheese Sauce (Queso)", price: 1.99, isMutuallyExclusive: true},
        {name: "Hollandaise Sauce", price: 1.99, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 5,
}

export const SideSaladOptions:CustomizationCategory = {
    name: "Garden Salad",
    isRequired: false,
    customizations: [{name: "Add Garden Salad", price: 4.29, isMutuallyExclusive: false}],
    maxSelectAmount: 1,
    // Really terrible workaround for the implementation
}

export const SlamburgerCustomizations: CustomizationCategory[] = [
    EggStyleOptions, BurgerPattyOptions, BurgerFillingOptions, SideOptions, SauceOptions, SideSaladOptions, 
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