

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
                minHeight: '50px',
                height: '50px',
                pl: 0,
                pr: 0,
            },
          

        }}onClick={toggleExpanded} expandIcon={<ExpandIcon fontSize='medium'/>}>
            <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems:'center', justifyContent: 'space-between', backgroundColor: 'inherit'}}>
                <Typography variant="h6" sx={{backgroundColor: 'inherit', fontSize: 18}}> 
                    Customizations:
                </Typography>
                <ShowHideTextElement isExpanded={expanded}/>
            </Box>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: theme.palette.beige.main, p: 1}}>
        {props.customizations && Object.entries(props.customizations).map(([key, category], index) => (
            category.amountSelected > 0 ? (<React.Fragment key={index}>
                <Typography variant="body2">{key}</Typography>
                {Object.entries(category.options).map(([key, option], index) => {
                    if(option.selected === true)
                    {
                        return (<Typography key={key + index} sx={{ marginLeft: 2 }}>
                                {key} (+$ {option.price.toFixed(2)})
                            </Typography>)
                    }
                    return (<React.Fragment key={key + index}></React.Fragment>)
                })}
            </React.Fragment>) : (<></>)
        ))}
        </AccordionDetails>
        </Accordion>
    )
 }

export default CustomizationsAccordion
