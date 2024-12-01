import BaconAvocadoCheeseburgerImg from '../assets/food/BaconAvocadoCheeseburger.jpg'
import Flaming5PepperBurgerImg from '../assets/food/Flaming5PepperBurger.png'
import TraditionalClubSandwichImg from '../assets/food/TraditionalClubSandwich.png'
import PotRoastMeltImg from '../assets/food/PotRoastMelt.png'
import DoubleCheeseburgerImg from '../assets/food/DoubleCheeseburger.png'
import FoodItem from "./FoodItem.ts";
import Slamburger from './Slamburger.ts'
import TraditionalClubSandwich from './TraditionalClubSandwich.ts'
import DummyText from "./DummyText.ts";

export const BaconAvocadoCheeseBurger:FoodItem = 
{
    name: "Bacon Avocado Cheeseburger",
    parentCategory: "Sandwiches and Burgers",
    description: DummyText,
    price: 19.99,
    preferredFontSize: 23.5,
    customizations: [],
    image: BaconAvocadoCheeseburgerImg,
    //  customizations are "optional"
    // -> when  in cart, pushing the selected customization options into the cart with the food item. 
}

export const PotRoastMelt:FoodItem =
{
    name: "Pot Roast Melt",
    parentCategory: "Sandwiches and Burgers",
    description: DummyText,
    price: 19.99,
    customizations: [],
    image: PotRoastMeltImg,
}

export const DoubleCheeseburger:FoodItem =
{
    name: "Double Cheeseburger",
    parentCategory: "Sandwiches and Burgers",
    description: DummyText,
    price: 19.99,
    customizations: [],
    image: DoubleCheeseburgerImg,
}

export const Flaming5PepperBurger:FoodItem = 
{
    name: "Flaming 5 Pepper Burger",
    parentCategory: "Sandwiches and Burgers",
    description: DummyText,
    price: 19.99,
    customizations: [],
    image: Flaming5PepperBurgerImg,
}

export const HandheldsList: FoodItem[] = [BaconAvocadoCheeseBurger, PotRoastMelt, Slamburger, TraditionalClubSandwich, DoubleCheeseburger, Flaming5PepperBurger];