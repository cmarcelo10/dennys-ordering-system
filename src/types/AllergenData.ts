import Slamburger from "./Slamburger"

type AllergenData = {
    name: string,
    allergens: string
}
export default AllergenData

const SlamburgerAllergenData:AllergenData = {
    name: "Slamburger",
    allergens: "Eggs, Dairy, Gluten"
}

export const AllergenDataTable = [
    SlamburgerAllergenData
]