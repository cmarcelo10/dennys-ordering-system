import { Card, CardHeader, Typography, Divider, CardContent, Box } from "@mui/material";
import React from "react";
import theme from "../styles/Theme";
import CustomizationCategory, { CustomizationOption } from "../types/CustomizationCategory";
import CustomizationPanel from "./CustomizationPanel";
interface CategoryCardProps
{
    name: string,
    category: CustomizationCategory,
    disableNewSelection: boolean,
    onChange: (newPrice: number, newAmountSelected: number, categoryName: string, updatedOptions:{[key:string]:CustomizationOption}) => void
}

const CategoryCard = ({name, category, disableNewSelection, onChange}: CategoryCardProps)=>
{
    const [options, setOptions] = React.useState(category.options);
    function handleSelection(key: string)
    {
        console.log("Handing selection of %s", key);
        const updatedOptions = options
        const customization = updatedOptions[key];
        if(customization.selected)
        {
            // we are DE-selecting an item
            category.totalPrice-=customization.price;
            category.amountSelected--;
        }
        else
        {
            category.totalPrice+=customization.price;
            category.amountSelected++;
            if(category.optionsAreMutuallyExclusive)
            {
                // deselect all others.
                console.log(`Category \"${key}\" is mutually exclusive`);
                Object.values(updatedOptions).forEach(opt => opt.selected = false);
            }
        }
   
        customization.selected = !customization.selected;
        if(category.optionsAreMutuallyExclusive && !customization.selected)
        {
            // prevent the user from deselecting mandatory fields.
            customization.selected = true;
        }
        console.log(`Selected ${category.amountSelected}`);
        setOptions({...options}); // avoid rewriting the old state.
        onChange(category.totalPrice, category.amountSelected, name, options);
    }
    return(
        <Card key={`${name} Card`} sx={{backgroundColor: "#F2EEEA"}}>
            <CardHeader sx={{
                fontWeight: 500, 
                '& .MuiCardHeader-root': 
                {
                    p: '2px', 
                    pl: 1, 
                    pr: 1,
                }
            }} title={
                <Typography variant='h4' fontSize={20} fontWeight={500}>
                {category.label ? category.label : name}
                </Typography>}/>
            <Divider/>
            <CardContent sx={{
                '&.MuiCardContent-root':
                {
                    m: '3px',
                    p: 0,
                }
            }}>
                <Box key={name + " Box"} display='flex' flexDirection={'column'}>
                    {<>{console.log(`Amount selected for ${name}: ${category.amountSelected}`)}</>}
                    {
                        Object.entries(options).map(([itemName, properties], index) =>
                        {
                            return(
                            <React.Fragment key={itemName + " Fragment"}>
                                <CustomizationPanel key={itemName+"panel"} name={itemName} price={properties.price} selected={properties.selected!} 
                                    onClick={handleSelection}
                                    disabled={disableNewSelection && !properties.selected && !category.optionsAreMutuallyExclusive}/>
                                    {index < Object.keys(options).length - 1 ? (<Divider key={itemName + "divider"}/>) : (<></>)}
                            </React.Fragment>)
                        })}
                </Box>
            </CardContent>
        </Card>
    );
}
export default CategoryCard