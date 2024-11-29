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
    preferredFontSize?: string | number,
    customizations: CustomizationCategory[],
    salad?: FoodItem,
}

export default FoodItem


/*

Category

*/