import CustomizationCategory from "./CustomizationCategory";
import GardenSaladSide, {SideSaladOptions} from "./GardenSaladSide";
import TraditionalClubSandwichImg from "../assets/food/TraditionalClubSandwich.png"
import FoodItem from "./FoodItem";
export const TCSSideOptions:CustomizationCategory = 
{
    name: "Side",
    label: "Select a Side",
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    maxSelectAmount: 1,
    amountSelected: 0,
    customizations:
    {
        "Hash Browns":{price: 0, selected: false, parentCategory: "Side"},
        "French Fries":{price: 0, selected: false, parentCategory: "Side"},
        "Seasonal Fruit":{price: 2.39, selected: false, parentCategory: "Side"},
        "Seasoned Fries":{price: 2.39, selected: false, parentCategory: "Side"},
        "Onion Rings":{price: 2.39, selected: false, parentCategory: "Side"},
        "Bacon Cheddar Tots (6pcs)":{price: 2.39, selected: false, parentCategory: "Side"},
        "Smothered Fries":{price: 4.39, selected: false,parentCategory: "Side"},
        "Poutine":{price: 4.39, selected: false, parentCategory: "Side"},
    },
}

export const TCSExtras:CustomizationCategory = 
{
    name: "Extras",
    label: "Add Extra Fillings:",
    isRequired: false,
    optionsAreMutuallyExclusive: false,
    customizations: {
       "Extra Bacon": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Swiss Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Cheddar Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Canadian Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
    },
    maxSelectAmount: 4,
    amountSelected: 0,
}
export const TraditionalClubSandwichCustomizations = [TCSSideOptions, TCSExtras, SideSaladOptions];

const TraditionalClubSandwich:FoodItem = 
{
    name: "Traditional Club Sandwich",
    parentCategory: "Sandwiches and Burgers",
    description: "Roasted turkey breast, bacon, lettuce, tomato, and mayo on toasted multigrain bread. Served with your choice of side",
    price: 17.59,
    preferredFontSize: 24,
    customizations: TraditionalClubSandwichCustomizations,
    image: TraditionalClubSandwichImg,
    salad: GardenSaladSide,

}
export default TraditionalClubSandwich;