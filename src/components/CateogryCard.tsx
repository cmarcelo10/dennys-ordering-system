import { Card, CardHeader, Typography, Divider, CardContent, Box } from "@mui/material";
import React from "react";
import theme from "../styles/Theme";
import CustomizationCategory, { CustomizationOption } from "../types/CustomizationCategory";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
interface CategoryCardProps
{
    name: string,
    category: CustomizationCategory,
    itemSelectionHandler: () => void
}
function shouldGreyOutChoice(cat: CustomizationCategory, cust: CustomizationOption)
{
    if(cat.amountSelected == cat.maxSelectAmount)
    {
        if(!cust.selected)
        {
            return true;
        }
    }
    return false;
}

const CategoryCard = ({category, itemSelectionHandler}: CategoryCardProps)=>
{
    const shouldGreyOutOption = React.useCallback(function (amountSelected: number, maxSelectAmount: number, customizationIsSelected: boolean)
    {
        return amountSelected === maxSelectAmount && !customizationIsSelected;

    }, [])
    const toggleSelected = React.useCallback(itemSelectionHandler, []);

    return(
        <Card sx={{backgroundColor: "#F2EEEA"}}>
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
                {category.label}
                </Typography>}/>
            <Divider/>
            <CardContent sx={{
                '&.MuiCardContent-root':
                {
                    m: '5px',
                    p: 0,
                }
            }}>
                <Box display='flex' flexDirection={'column'}>
                    {Object.entries(category.customizations).map(([itemName, properties], key) =>
                        (
                            // Get the parent category of the customization
                            // Find the customization
                            // Change its state to selected.
                            <> {/*<> </> is shorthand for react fragments*/}
                            <Box key={key} display='flex' alignContent='center' flexDirection='row' justifyContent = 'space-between' bgcolor={properties.selected && theme.palette.dennysYellow.main}
                                onClick={()=>{toggleSelected(key, itemName)}}
                                borderColor={theme.palette.dennysGrey.main} width={'100%'} 
                                sx={{
                                    borderBox: 'content-box',
                                    fontSize: 16,
                                    }}>
                                <Box display='flex' flexDirection='row' alignItems='center' m={1}>
                                    {properties.selected ? (
                                        <TaskAltRoundedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: 'black'}} />
                                    ):(
                                        <RadioButtonUncheckedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: shouldGreyOutOption(category.maxSelectAmount, category.amountSelected, customization.selected!) ? theme.palette.text.disabled : undefined}} />
                                    ) }
                                    <Typography color={shouldGreyOutChoice(category, properties) ? theme.palette.text.disabled : undefined} fontSize={16} alignSelf='center' pl={0.25} fontWeight={ customization.selected? 500 : undefined}>{customization.name}</Typography>
                                </Box>
                                <Typography color={shouldGreyOutChoice(category, properties) ? theme.palette.text.disabled : undefined} fontSize='inherit'  alignSelf='center' pr={2} fontWeight={ customization.selected? 500 : undefined}>
                                    {properties.price > 0 ? (<>+ ${property.price}</>):(<>{/* render nothing */}</>)}
                                </Typography>
                            </Box>
                            {key < Object.keys(category.customizations).length - 1 ? (<Divider key={(index+1)*100}/>) : (<></>)}
                            </>
                        )
                    )
                    }
                </Box>
            </CardContent>
        </Card>
    );
}
export default CategoryCard