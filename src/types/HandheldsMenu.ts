import BaconAvocadoCheeseburgerImg from '../assets/food/BaconAvocadoCheeseburger.jpg'
import Flaming5PepperBurgerImg from '../assets/food/Flaming5PepperBurger.png'
import PotRoastMeltImg from '../assets/food/PotRoastMelt.png'
import DoubleCheeseburgerImg from '../assets/food/DoubleCheeseburger.png'
import FoodItem from "./FoodItem.ts";
import Slamburger, { BurgerPattyOptions } from './Slamburger.ts'
import TraditionalClubSandwich from './TraditionalClubSandwich.ts'
import { SauceOptions, SlamburgerSideOptions} from './Slamburger.ts';
import { SideSaladOptions } from './GardenSaladSide.ts';
export const BaconAvocadoCheeseBurger:FoodItem = 
{
    name: "Bacon Avocado Cheeseburger",
    parentCategory: "Sandwiches and Burgers",
    description: "Bacon, fresh avocado, aged white cheddar cheese, red relish, mayo, shredded iceberg lettuce, tomato, red onions and pickles on a brioche bun.",
    price: 19.39,
    preferredFontSize: 20.5,
    allergenFontSize: 16,
    nutritionalData:
    {
        name: "Bacon Avocado Cheeseburger",
        calories: "1150",
        fat: "89.7 g",
        saturated_fat: "29.5 g",
        trans_fat: "1.3 g",
        cholesterol: "217 mg",
        sodium: "1936 mg",
        carbohydrates: "43.5g",
        protein: "52.9 g",
        fibre: "13.5 g",
        sugar: "9.6 g",
    },
    allergens: "Egg, Dairy, Soy, Gluten, Mustard",
    customizations: {
        SlamburgerSideOptions, BurgerPattyOptions, SauceOptions, SideSaladOptions,
    },
    image: BaconAvocadoCheeseburgerImg,
    //  customizations are "optional"
    // -> when  in cart, pushing the selected customization options into the cart with the food item. 
}

export const PotRoastMelt:FoodItem =
{
    name: "Pot Roast Melt",
    parentCategory: "Sandwiches and Burgers",
    description: "Tender slow-roasted beef, caramelized onions and aged white cheddar on grilled sourdough bread.",
    allergens: "Dairy, Soy, Gluten",
    nutritionalData:
    {
        name: "Pot Roast Melt",
        calories: "960",
        fat: "56.5 g",
        saturated_fat: "20.2 g",
        trans_fat: "0.8 g",
        cholesterol: "147 mg",
        sodium: "3920 mg",
        carbohydrates: "50.9 g",
        protein: "53.0 g",
        fibre: "2.2 g",
        sugar: "8.2 g",
    },
    price: 19.99,
    customizations: {
        "Side":
        {
            label: "Select a Side",
            isRequired: true,
            maxSelectAmount: 1,
            amountSelected: 0,
            optionsAreMutuallyExclusive: true,
            options:
            {
                "Hash Browns": { price: 0, parentCategory: "Side"},
                "Wavy-Cut fries": {price: 0,parentCategory: "Side"},
                "Seasonal Fruit": {price: 2.39, parentCategory: "Side"},
                "Seasoned Fries": {price: 2.39, parentCategory: "Side"},
                "Onion Rings": {price: 2.39, parentCategory: "Side"},
                "Bacon Cheddar Tots": {price: 3.49, parentCategory: "Side"},
                "Smothered Fries": {price: 4.39, parentCategory: "Side"},
                "Poutine": {price: 4.69, parentCategory: "Side"},
            },
            totalPrice: 0,
        }, SauceOptions, SideSaladOptions,
    },
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
    name: "Flamin 5 Pepper Burger",
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