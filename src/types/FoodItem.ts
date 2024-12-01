import CustomizationCategory from "./CustomizationCategory"
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
    preferredFontSize?: string | number,
    salad?: FoodItem,
}
export default FoodItem


/*

Category

*/
