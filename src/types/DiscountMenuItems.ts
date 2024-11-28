import DiscountItem from "./DiscountItem.ts";
import DummyText from "./DummyText.ts";

export const KidsHourDiscount:DiscountItem = 
{
    name: "Kids' Hour: Buy one get 50% off any kids menu item",
    description: DummyText,
    preferredFontSize: 23.5,

}

export const HappyHourDiscount:DiscountItem =
{
    name: "Happy Hour - $10.00 Appetizers",
    description: DummyText,
    preferredFontSize: 23.5,

}

export const SeniorsDiscount:DiscountItem =
{
    name: "Senior's Discount - 50% off",
    description: DummyText,
    preferredFontSize: 24,
}

export const FreePieDiscount:DiscountItem =
{
    name: "Free Pumpkin Pie On orders $75+",
    description: DummyText,
    preferredFontSize: 23.5,
}


export const DiscountList: DiscountItem[] = [KidsHourDiscount,HappyHourDiscount,SeniorsDiscount,FreePieDiscount];