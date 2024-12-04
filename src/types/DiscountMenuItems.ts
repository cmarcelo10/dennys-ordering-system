import DiscountItem from "./DiscountItem.ts";

export const KidsHourDiscount:DiscountItem = 
{
    name: "Kids' Hour: Buy one get 50% off any kids menu item",
    description: "Get 50% off any kids menu item with the purchase of any other kids menu item. Discount applied to the lesser priced item. ",
    preferredFontSize: 23.5,
}

export const HappyHourDiscount:DiscountItem =
{
    name: "Happy Hour - $10.00 Appetizers",
    description: "Get any of our appetizers for $10.00 or less! Excludes Build Your Own Sampler.",
    preferredFontSize: 23.5,
}

export const SeniorsDiscount:DiscountItem =
{
    name: "Senior's Discount - 50% off",
    description: "50% off one full-priced menu item, excluding alcoholic beverages. Cannot be combined with other offers. Ask your server for more details",
    preferredFontSize: 24,
}

export const FreePieDiscount:DiscountItem =
{
    name: "Free Pumpkin Pie on orders $75+",
    description: "Get a free pumpkin pie to share on orders $75.00 ($19.99 value). Total must reach $75.00 before tax, tips, and other offers.",
    preferredFontSize: 23.5,
}
export const DiscountList: DiscountItem[] = [KidsHourDiscount,HappyHourDiscount,SeniorsDiscount,FreePieDiscount];