import FoodItem from "./FoodItem";
import CustomizationCategory from "./CustomizationCategory";
const GardenSaladSide: FoodItem = 
{
    name: "Garden Salad",
    parentCategory: "Sides and Salads",
    price: 4.29,
    customizations:
    {
            "Dressing Options":
            {
                label: "Select a dressing",
                isRequired: false,
                optionsAreMutuallyExclusive: true,
                maxSelectAmount: 1,
                amountSelected: 0,
                options:
                {
                    // parentCategory name and the actual name of the parent cateogry must match
                    "1000 island":{selected: false, price: 0, parentCategory: "Dressing Options"},
                    "Balsamic":{selected: false, price: 0, parentCategory: "Dressing Options"},
                    "Blue Cheese":{selected: false, price: 0, parentCategory: "Dressing Options"},
                    "Garden Herb":{selected: false, price: 0, parentCategory: "Dressing Options"},
                    "Honey Mustard":{selected: false, price: 0, parentCategory: "Dressing Options"},
                }
        }
    }
}

export const SideSaladOptions:CustomizationCategory = 
{
    isRequired: false,
    options: {"Add Garden Salad":{price: 4.29, selected: false, parentCategory: "Side Salad"}},
    optionsAreMutuallyExclusive: true,
    maxSelectAmount: 1,
    amountSelected: 0,
    // Really terrible workaround for the implementation
}
export default GardenSaladSide