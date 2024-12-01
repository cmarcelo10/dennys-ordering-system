type NutritionalData =
{
    name: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fibre: number,
    sugar: number,
    fat: number,
    saturated_fat: number,
    trans_fat: number,
    cholesterol: number,
    sodium: number
}
export default NutritionalData

const SlamburgerNutritionData:NutritionalData = {
    name: "Slamburger",
    calories: 1090,
    protein: 53.6,
    carbohydrates: 55.4,
    fibre: 11.6,
    sugar: 7.7,
    fat: 73.6,
    saturated_fat: 27.9,
    trans_fat: 1.3,
    cholesterol: 212,
    sodium: 2106
}

export const NutritionalDataTable = [SlamburgerNutritionData]