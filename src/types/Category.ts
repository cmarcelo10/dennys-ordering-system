import FoodItem from "./FoodItem"

type Category =
{
    index?: number,
    name: string,
    image?: string,
    categoryPage?: string, // constructed at runtime
    items?:
    {
        [key: string]: FoodItem
    }
}
export default Category