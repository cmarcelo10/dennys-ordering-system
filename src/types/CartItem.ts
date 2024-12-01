import FoodItem from "./FoodItem";
export default interface CartItem
{
    id: number, 
    itemName: string,
    customizations:
    {
        [key: string]: string,
    }
    quantity: number,
}
