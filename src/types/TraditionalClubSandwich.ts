import CustomizationCategory from "./CustomizationCategory";
import GardenSaladSide, {SideSaladOptions} from "./GardenSaladSide";
import TraditionalClubSandwichImg from "../assets/food/TraditionalClubSandwich.png"
import FoodItem from "./FoodItem";

export const TCSSideOptions:CustomizationCategory = 
{
    label: "Select a Side",
    isRequired: true,
    optionsAreMutuallyExclusive: true,
    maxSelectAmount: 1,
    amountSelected: 0,
    options:
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
    totalPrice: 0,
}

export const TCSExtras:CustomizationCategory =
{
    label: "Add Extra Fillings:",
    isRequired: false,
    optionsAreMutuallyExclusive: false,
    options: {
       "Extra Bacon": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Swiss Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Cheddar Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
       "Extra Canadian Cheese": {price: 2.29, selected: false, parentCategory: "Extras"},
    },
    maxSelectAmount: 4,
    amountSelected: 0,
    totalPrice: 0,
}
export const TraditionalClubSandwichCustomizations = 
{
    "Extras": TCSExtras,
    "Side": TCSSideOptions, 
    "Side Salad": SideSaladOptions
};

const TraditionalClubSandwich:FoodItem = 
{
    name: "Traditional Club Sandwich",
    parentCategory: "Sandwiches and Burgers",
    description: "Roasted turkey breast, bacon, lettuce, tomato, and mayo on toasted multigrain bread. Served with your choice of side",
    price: 17.59,
    preferredFontSize: 24,
    customizations: TraditionalClubSandwichCustomizations,
    image: TraditionalClubSandwichImg,
    allergens: "Gluten, Dairy",
    nutritionalData: {
        name: "Traditional Club Sandwich",
        calories: '600',
        protein: '40.1 g',
        fat: '35.2 g',
        fibre: '5.3 g',
        sugar: '6.1 g',
        carbohydrates: '34.5 g',
        saturated_fat: '0.7 g',
        trans_fat:'0.1 g',
        cholesterol: '88 mg',
        sodium: '1700 mg',
    },
    salad: GardenSaladSide,
}
export default TraditionalClubSandwich;
