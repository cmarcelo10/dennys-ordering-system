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
    image?: string,
    largeImage?: string,
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