

import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExpandIcon from '@mui/icons-material/ExpandCircleDownTwoTone';
import theme from '../../styles/Theme'
import CustomizationOption from '../../types/CustomizationOption'
import ShowHideTextElement from './ShowHideTextElement'
import CustomizationCategory from '../../types/CustomizationCategory'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

interface CustomizationsAccordionProps
{
    customizations?: {[key: string]: CustomizationCategory}
    expanded?: boolean,
}
const CustomizationsAccordion = ({...props}:CustomizationsAccordionProps)=>
{
    const [expanded, setExpanded] = React.useState(false);
    function toggleExpanded()
    {
        setExpanded((prev)=>!prev);
    }

    return (
        <Accordion expanded={expanded} elevation={0} defaultExpanded={true} sx={{
        boxShadow: 0,
        backgroundColor: theme.palette.beige.main,
        }}>
        <AccordionSummary sx={{
            backgroundColor: 'none',
            '&.MuiButtonBase-root':
            {
                minHeight: 50,
                height: 50,
                pl: 0,
                pr: 0,
                p: 0
            },
            '&.MuiAccordionSummaryContent-root':
            {
                m: 1
            }
          

        }}onClick={toggleExpanded} expandIcon={<ExpandIcon fontSize='medium'/>}>
            <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems:'center', justifyContent: 'space-between', backgroundColor: 'inherit'}}>
                <Typography variant="h6" sx={{backgroundColor: 'inherit', fontSize: 18}}> 
                    Customizations:
                </Typography> 
                <Divider variant='middle'/>
                <ShowHideTextElement isExpanded={expanded}/>
            </Box>
        </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: theme.palette.beige.main, p: 1}}>
                <Stack>
                    {props.customizations && Object.entries(props.customizations).map(([key, category], index) => (
                        category.amountSelected > 0 ? (<React.Fragment key={index}>
                            <Typography variant="h6" fontSize={16} sx={{mt: 1}}>{category.label? category.label : key}</Typography>
                            <Divider variant='middle'/>
                            <Stack>
                            {Object.entries(category.options).map(([key, option], index) => {
                                if(option.selected === true)
                                {
                                    return (
                                    <Box key={key} sx={{display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', m: 0.5, mr: 0, mt: 1}}>
                                        <Typography key={key + index} sx={{ marginLeft: 2 }}>
                                            {key}
                                        </Typography> 
                                        {option.price > 0 && (<Typography>+${' '}{option.price.toFixed(2)}</Typography>)}
                                    </Box>
                                        )
                                }
                                return (<React.Fragment key={key + index}></React.Fragment>)
                            })}
                            </Stack>
                        </React.Fragment>) : (<></>)
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
 }

export default CustomizationsAccordion
