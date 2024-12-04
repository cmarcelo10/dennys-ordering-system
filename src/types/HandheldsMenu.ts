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
    description: "Bacon, fresh avocado, aged white cheddar cheese, red relish, mayo, shredded iceberg lettuce, tomato, red onions and pickles on a brioche bun.",
    price: 19.39,
    preferredFontSize: 20.5,
    customizations: {},
    image: BaconAvocadoCheeseburgerImg,
    //  customizations are "optional"
    // -> when  in cart, pushing the selected customization options into the cart with the food item. 
}

export const PotRoastMelt:FoodItem =
{
    name: "Pot Roast Melt",
    parentCategory: "Sandwiches and Burgers",
    description: "Tender slow-roasted beef, caramelized onions and aged white cheddar on grilled sourdough bread.",
    price: 19.99,
    customizations: {},
    image: PotRoastMeltImg,
}

export const SingleCheeseburger:FoodItem =
{
    name: "Single Cheeseburger",
    parentCategory: "Sandwiches and Burgers",
    description: "Your choice of Canadian, Swiss, or aged white cheddar cheese with red relish, mayo, shredded iceberg lettuce, tomato, red onions, and pickles on a brioche bun.",
    price: 17.99,
    customizations: {},
    image: DoubleCheeseburgerImg,
}

export const DoubleCheeseburger:FoodItem =
{
    name: "Double Cheeseburger",
    parentCategory: "Sandwiches and Burgers",
    description: "Your choice of Canadian, Swiss, or aged white cheddar cheese with red relish, mayo, shredded iceberg lettuce, tomato, red onions, and pickles on a brioche bun.",
    price: 20.19,
    customizations: {},
    image: DoubleCheeseburgerImg,
}

export const Flaming5PepperBurger:FoodItem = 
{
    name: "Flaming 5 Pepper Burger",
    parentCategory: "Sandwiches and Burgers",
    description: "Aged white cheddar cheese, bacon, jalapeños, 5-pepper sauce, mayo, shredded iceberg lettuce, tomato, red onions and pickles on a brioche bun",
    price: 19.39,
    customizations: {},
    image: Flaming5PepperBurgerImg,
}

export const HandheldsMenu = 
{
    "Bacon Avocado Cheeseburger": BaconAvocadoCheeseBurger,
    "Pot Roast Melt": PotRoastMelt,
    "Single Cheeseburger": SingleCheeseburger,
    "Double Cheeseburger": DoubleCheeseburger,
    "Slamburger": Slamburger,
    "Flaming 5 Pepper Burger": Flaming5PepperBurger,
}

export const HandheldsList: FoodItem[] = [BaconAvocadoCheeseBurger, PotRoastMelt, TraditionalClubSandwich, SingleCheeseburger, DoubleCheeseburger, Slamburger, Flaming5PepperBurger]