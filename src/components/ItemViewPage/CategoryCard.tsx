import { Card, CardHeader, Typography, Divider, CardContent, Box } from "@mui/material";
import React from "react";
import theme from "../../styles/Theme";
import CustomizationCategory, { CustomizationOption } from "../../types/CustomizationCategory";
import CustomizationPanel from "./CustomizationPanel";
interface CategoryCardProps
{
    name: string,
    category: CustomizationCategory,
    disableNewSelection: boolean,
    onChange: (newPrice: number, newAmountSelected: number, categoryName: string, updatedOptions:{[key:string]:CustomizationOption}) => void
}
const requiredText = "(required)";
const CategoryCard = ({name, category, disableNewSelection, onChange}: CategoryCardProps)=>
{
    const [options, setOptions] = React.useState(category.options);
    function handleSelection(key: string)
    {
        const updatedOptions = options
        const customization = updatedOptions[key];
        if(customization.selected)
        {
            // we are DE-selecting an item
            customization.selected = false;
            console.log(`${key} was selected and has a price of $${customization.price}`);
            console.log(`the total price for the category ${name} is $${category.totalPrice}`);
            category.totalPrice-=customization.price;
            console.log(`the total price for the category ${name} is now $${category.totalPrice}`);
            category.amountSelected--;
        }
        else
        {
            customization.selected = true;
            console.log(`${key} was selected and has a price of $${customization.price}`);
            console.log(`the total price for the category ${name} is $${category.totalPrice}`);
            category.totalPrice+=customization.price;
            console.log(`the total price for the category ${name} is now $${category.totalPrice}`);
            category.amountSelected++;
            if(category.optionsAreMutuallyExclusive)
            {
                // deselect all others.
                Object.entries(updatedOptions).forEach(([optKey, opt]) => 
                {
                    if(optKey != key)
                    {
                        if(opt.selected)
                        {
                            category.totalPrice -= opt.price;
                            category.amountSelected--; 
                            // the amount selected per category should always remain consistent, 
                            // even if the options are mutually exclusive
                            opt.selected = false;
                        }
                    }
                });
            }
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
                },
                borderBottomWidth: 3,
                borderBottomStyle: 'solid',
                borderBottomColor: theme.palette.dennysGrey.main
            }} title={
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <span>
                    <Typography variant='h4' fontSize={20} fontWeight={500}>
                        {category.label ? category.label : name}
                    </Typography>
                    <Typography>
                        {category.isRequired ? requiredText : <></>}
                    </Typography>
                </span>
                <Typography>
                    {category.amountSelected}/ {category.maxSelectAmount}
                </Typography>
                </Box>
            }/>
            <Divider/>
            <CardContent sx={{
                '&.MuiCardContent-root':
                {
                    m: '3px',
                    p: 0,
                }
            }}>
                <Box key={name + " Box"} display='flex' flexDirection={'column'}>
                    {
                        Object.entries(options).map(([itemName, properties], index) =>
                        (
                            <React.Fragment key={itemName + " Fragment"}>
                                <CustomizationPanel key={itemName+"panel"} name={itemName} price={properties.price} selected={properties.selected!} 
                                    onClick={handleSelection}
                                    disabled={disableNewSelection && !properties.selected && !category.optionsAreMutuallyExclusive}/>
                                {index < Object.keys(options).length - 1 ? (<Divider key={itemName + "divider"}/>) : (<></>)}
                            </React.Fragment>
                        ))
                    }
                </Box>
            </CardContent>
        </Card>
    );
}
export default CategoryCard