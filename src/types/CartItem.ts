import FoodItem from "./FoodItem";
export default interface CartItem
{
    id: number,
    item: FoodItem,
    quantity: number,
}
