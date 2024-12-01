import CustomizationOption from "./CustomizationOption"
type CustomizationCategory = 
{
    name: string, // the internal name.
    label?: string,
    customizations: 
    {
        [key:string]: 
        {
            price: number,
            selected: boolean,
            parentCategory: string,
        }
    }
    isRequired: boolean,
    optionsAreMutuallyExclusive: boolean,
    maxSelectAmount: number,
    amountSelected: number,
    parentItem?: string,
    totalPrice?: number,
}

export default CustomizationCategory
export type {CustomizationOption} // for convenience.