import SlamburgerImage from '../assets/food/Slamburger.jpg'
import SignatureBreakfastsImage from '../assets/food/SignatureBreakfasts.jpg'
import ShareableStartersImage from '../assets/food/ShareableStarters.jpg'
import FeaturedImage from '../assets/food/Featured.jpg'
import AppetizersImage from '../assets/food/Appetizers.jpg'
import SavouryOmelettesImage from '../assets/food/SavoryOmelettes.jpg'
import PremiumPancakesImage from '../assets/food/PremiumPancakes.jpg'
import EntreesImage from '../assets/food/Entrees.jpg'
import DrinksNShakesImage from '../assets/food/Drinks.jpg'
import DennysDeals from '../assets/DennysDeals.jpg'
import Category from './Category.ts';
const Categories: Category[] = [
    {index: 0, name: 'Featured', image: FeaturedImage},
    {index: 1, name: 'Deals and Promos', image: DennysDeals},
    {index: 2, name: 'Appetizers', image: AppetizersImage},
    {index: 3, name: 'Drinks and Shakes', image: DrinksNShakesImage},
    {index: 4, name: 'Shareable Starters', image: ShareableStartersImage},
    {index: 5, name: 'Sandwiches and Burgers', image: SlamburgerImage},
    {index: 6, name: 'Savoury Omelettes', image: SavouryOmelettesImage},
    {index: 7, name: 'Premium Pancakes', image: PremiumPancakesImage},
    {index: 8, name: 'Entrées', image: EntreesImage},
    {index: 9, name: 'Signature Breakfasts', image: SignatureBreakfastsImage}
];

export default Categories;