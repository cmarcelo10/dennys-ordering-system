import Slamburger from "./Slamburger"

type Allergen = {
    name: string,
    allergens: string[]
}
export default Allergen

const SlamburgerAllergenData:Allergen = {
    name: "Slamburger",
    allergens: ["Eggs", "Dairy", "Gluten"]
}

export const AllergenDataTable = [
    SlamburgerAllergenData
]