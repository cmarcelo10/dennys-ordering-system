import FoodItem from "./FoodItem.ts";
import BaconAvocadoCheeseburgerImg from '../assets/food/BaconAvocadoCheeseburger.jpg'
import Flaming5PepperBurgerImg from '../assets/food/Flaming5PepperBurger.png'
import TraditionalClubSandwichImg from '../assets/food/TraditionalClubSandwich.png'
import PotRoastMeltImg from '../assets/food/PotRoastMelt.png'
import DoubleCheeseburgerImg from '../assets/food/DoubleCheeseburger.png'
import SlamburgerSmall from '../assets/food/Slamburger.jpg'
import SlamburgerLarge from '../assets/food/Slamburger.png'
import DummyText from "./DummyText.ts";

export const Slamburger:FoodItem = 
{
    name: 'Slamburger',
    description: DummyText,
    price: 19.99,
    image: SlamburgerSmall,
    largeImage: SlamburgerLarge,
    menuPage: "/sandwiches-and-burgers/slamburger"
}

export const BaconAvocadoCheeseBurger:FoodItem = 
{
    name: "Bacon Avocado Cheeseburger",
    description: DummyText,
    price: 19.99,
    preferredFontSize: 23.5,
    image: BaconAvocadoCheeseburgerImg,
}

export const PotRoastMelt:FoodItem =
{
    name: "Pot Roast Melt",
    description: DummyText,
    price: 19.99,
    image: PotRoastMeltImg,
}

export const TraditionalClubSandwich:FoodItem =
{
    name: "Traditional Club Sandwich",
    description: DummyText,
    price: 19.99,
    preferredFontSize: 24,
    image: TraditionalClubSandwichImg,
}

export const DoubleCheeseburger:FoodItem =
{
    name: "Double Cheeseburger",
    description: DummyText,
    price: 19.99,
    image: DoubleCheeseburgerImg,
}

export const Flaming5PepperBurger:FoodItem = 
{
    name: "Flaming 5 Pepper Burger",
    description: DummyText,
    price: 19.99,
    image: Flaming5PepperBurgerImg,
}

export const HandheldsList: FoodItem[] = [BaconAvocadoCheeseBurger, PotRoastMelt, Slamburger, TraditionalClubSandwich, DoubleCheeseburger, Flaming5PepperBurger];