import CustomizationOption from "./CustomizationOption"
type CustomizationCategory = 
{ 
    label?: string,
    options: 
    {
        [key:string]: CustomizationOption
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