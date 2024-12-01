import { Card, CardHeader, Typography, Divider, CardContent, Box } from "@mui/material";
import React from "react";
import theme from "../styles/Theme";
import CustomizationCategory, { CustomizationOption } from "../types/CustomizationCategory";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
interface CategoryCardProps
{
    index: number,
    category: CustomizationCategory,
    itemSelectionHandler: (index: number, childIndex: number, isMutuallyExclusiveOption: boolean) => void
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

const CategoryCard = ({index, category, itemSelectionHandler}: CategoryCardProps)=>
{
    const shouldGreyOutOption = React.useCallback(function (amountSelected: number, maxSelectAmount: number, customizationIsSelected: boolean)
    {
        return amountSelected === maxSelectAmount && !customizationIsSelected;

    }, [])
    const toggleSelected = React.useCallback(itemSelectionHandler, []);

    return(
        <Card key={index} sx={{backgroundColor: "#F2EEEA"}}>
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
                {category.name}
                </Typography>}/>
            <Divider/>
            <CardContent sx={{
                '&.MuiCardContent-root':
                {
                    m: '5px',
                    p: 0,
                }
            }}>
                <Box key={(category.index!)} display='flex' flexDirection={'column'}>
                    {category.customizations.map((customization, keyValue)=>
                        (
                            <> {/*<> </> is shorthand for react fragments*/}
                            <Box key={keyValue} display='flex' alignContent='center' flexDirection='row' justifyContent = 'space-between' bgcolor={customization.selected ? theme.palette.dennysYellow.main : 'none'}
                                onClick={()=>{toggleSelected(index, keyValue, customization.isMutuallyExclusive)}}
                                borderColor={theme.palette.dennysGrey.main} width={'100%'} 
                                sx={{
                                    borderBox: 'content-box',
                                    fontSize: 16,
                                    }}>
                                <Box key={customization.index!} display='flex' flexDirection='row' alignItems='center' m={1}>
                                    {customization.selected ? (
                                        <TaskAltRoundedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: 'black'}} />
                                    ):(
                                        <RadioButtonUncheckedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: shouldGreyOutOption(category.maxSelectAmount, category.amountSelected, customization.selected!) ? theme.palette.text.disabled : undefined}} />
                                    ) }
                                    <Typography color={shouldGreyOutChoice(category, customization) ? theme.palette.text.disabled : undefined} fontSize={16} alignSelf='center' pl={0.25} fontWeight={ customization.selected? 500 : undefined}>{customization.name}</Typography>
                                </Box>
                                <Typography color={shouldGreyOutChoice(category, customization) ? theme.palette.text.disabled : undefined} fontSize='inherit'  alignSelf='center' pr={2} fontWeight={ customization.selected? 500 : undefined}>
                                    {customization.price > 0 ? (<>+ ${customization.price}</>):(<>{/* render nothing */}</>)}
                                </Typography>
                            </Box>
                            {keyValue < category.customizations.length - 1 ? (<Divider key={(index+1)*100}/>) : (<></>)}
                            </>
                        )
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
export default CategoryCard