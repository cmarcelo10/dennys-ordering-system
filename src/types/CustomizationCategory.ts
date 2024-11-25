import CustomizationOption from "./CustomizationOption"
type CustomizationCategory = 
{
    index?: number,
    name: string, // the internal name.
    label?: string,
    customizations: CustomizationOption[];
    isRequired: boolean,
    maxSelectAmount: number,
    parentItem?: string,
    totalPrice?: number,
}

export default CustomizationCategory
export type {CustomizationOption} // for convenience.