import FoodItem from "./FoodItem";
export default interface CartItem
{
    id: string,
    item: FoodItem,
    price: number,
    quantity: number,
    comments?: string,
    originalPrice?: number,
}
