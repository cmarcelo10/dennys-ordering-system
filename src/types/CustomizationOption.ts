type CustomizationOption =
{
    index?: number, // can be assigned dynamically at runtime.
    name: string,
    price: number,
    calories?: number,
    selected?: boolean,
    parentCategory?: string
    isMutuallyExclusive: boolean
}

export default CustomizationOption