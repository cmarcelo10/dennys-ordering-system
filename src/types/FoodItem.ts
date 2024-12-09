import AllergenData from "./AllergenData"
import CustomizationCategory from "./CustomizationCategory"
import NutritionalData from "./NutritionalData"
type FoodItem =
{
    name: string,
    parentCategory: string,
    url?: string,
    description?: string
    price: number,
    customizationsPrice?: number,
    image?: string,
    largeImage?: string,
    allergenFontSize?: number
    customizations:
    {
        [key: string]: CustomizationCategory,
    }
    allergens?: string,
    nutritionalData?: NutritionalData;
    preferredFontSize?: string | number,
    salad?: FoodItem,
}
export default FoodItem