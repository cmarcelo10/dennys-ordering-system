import FoodItem from "./FoodItem";
import CustomizationCategory from "./CustomizationCategory";
const GardenSaladSide: FoodItem = 
{
    name: "Garden Salad",
    parentCategory: "Sides and Salads",
    price: 4.29,
    customizations: 
    [
        {
            index: 1, 
            name: "Dressing Choice",
            isRequired: true,
            customizations: 
            [
                {
                    index: 1.1,
                    name: "No dressing", 
                    price: 0, isMutuallyExclusive: true
                },
                {
                    index: 1.2,
                    name: "1000 island",
                    price: 0, isMutuallyExclusive: true
                },
                {
                    index: 1.3,
                    name: "Balsamic",
                    price: 0, isMutuallyExclusive: true
                },
                {
                    index: 1.4,
                    name: "Blue Cheese",
                    price: 0,
                    isMutuallyExclusive: true
                },
                {
                    index: 1.5,
                    name: "Garden Herb", price: 0,
                    isMutuallyExclusive: true
                },
                {
                    index: 1.6,
                    name: "Honey Mustard", 
                    price: 0, 
                    isMutuallyExclusive: true
                },
            ],
            maxSelectAmount: 1,
            amountSelected: 0,
        }
    ]

}

export const SideSaladOptions:CustomizationCategory = {
    name: "Garden Salad",
    isRequired: false,
    customizations: [{name: "Add Garden Salad", price: 4.29, isMutuallyExclusive: false}],
    maxSelectAmount: 1,
    amountSelected: 0,
    // Really terrible workaround for the implementation
}
export default GardenSaladSide