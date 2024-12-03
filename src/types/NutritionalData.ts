type NutritionalData =
{
    name: string,
    calories: string,
    fat: string,
    saturated_fat: string,
    trans_fat: string,
    cholesterol: string,
    sodium: string
    carbohydrates: string,
    fibre: string,
    sugar: string,
    protein: string,
}
export default NutritionalData

export const SlamburgerNutritionalData:NutritionalData = {
    name: "Slamburger",
    calories: "1090",
    fat: "73.6 g",
    saturated_fat: "27.9 g",
    trans_fat: "1.3 g",
    cholesterol: "212 mg",
    sodium: "2106 mg",
    carbohydrates: "55.4 g",
    fibre: "11.6 g",
    sugar: "7.7 g",
    protein: "53.6 g",
}

export const NutritionalDataTable = [SlamburgerNutritionalData]