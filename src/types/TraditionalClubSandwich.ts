import CustomizationCategory from "./CustomizationCategory";
import GardenSaladSide, {SideSaladOptions} from "./GardenSaladSide";
import TraditionalClubSandwichImg from "../assets/food/TraditionalClubSandwich.png"
import FoodItem from "./FoodItem";
export const SideOptions:CustomizationCategory = 
{
    index: 0,
    name: "Side",
    label: "Select a Side",
    isRequired: true,
    customizations: [
        {index: 0.1, name: "Hash Browns", price: 0, isMutuallyExclusive: true},
        {index: 0.2, name: "French Fries", price: 0, isMutuallyExclusive: true},
        {index: 0.3, name: "Seasonal Fruit", price: 2.39, isMutuallyExclusive: true},
        {index: 0.4, name: "Seasoned Fries", price: 2.39, isMutuallyExclusive: true},
        {index: 0.5, name: "Onion Rings", price: 2.39, isMutuallyExclusive: true},
        {index: 0.6, name: "Bacon Cheddar Tots (6pcs)", price: 3.49, isMutuallyExclusive: true},
        {index: 0.7, name: "Smothered Fries", price: 4.39, isMutuallyExclusive: true},
        {index: 0.8, name: "Poutine", price: 4.69, isMutuallyExclusive: true},
    ],
    maxSelectAmount: 1,
    amountSelected: 0,
}

export const TCSExtras:CustomizationCategory = 
{
    index: 1,
    name: "Extras",
    label: "Add Extra Fillings:",
    isRequired: false,
    customizations: [
        {index: 1.1, name: "Extra Bacon", price: 2.29, isMutuallyExclusive: false},
        {index: 1.2, name: "Extra Swiss Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 1.3, name: "Extra Cheddar Cheese", price: 2.29, isMutuallyExclusive: false},
        {index: 1.4, name: "Extra Canadian Cheese", price: 2.29, isMutuallyExclusive: false},
    ],
    maxSelectAmount: 4,
    amountSelected: 0,
}
export const TraditionalClubSandwichCustomizations = [SideOptions, TCSExtras, SideSaladOptions];

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