import { Card, CardHeader, Typography, CardContent, Box, Button, Modal, Divider } from "@mui/material";
import React from "react";
import AllergenData from "../../types/AllergenData";
import NutritionalData from "../../types/NutritionalData";

interface ImportantInfoCardProps
{
    nutritionalData?: NutritionalData,
    allergenData?: string,
    modalOpen: boolean,
    openModal: ()=>void,
    closeModal: ()=>void,
}

const popupStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function toTitleCase(text: string)
{
    return text.replace(/(^|_)(\w)/g, (_, __, letter) => ` ${letter.toUpperCase()}`).trim(); // ChatGPT
}
const NutritionalDataRow = React.memo(({fieldName, value}:{fieldName: string, value: string}) =>
(
    <React.Fragment>
        <Box fontSize={18} className="nutrition-data-popup-desc" sx={{p: 1}} display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <Typography fontWeight={800} letterSpacing={1.2} fontSize='inherit'>{toTitleCase(fieldName)}</Typography>
            <Typography fontWeight={400} fontSize='inherit'>{value}</Typography>
        </Box>
        <Divider variant='fullWidth'/>
    </React.Fragment>
),(prev, next) => prev.fieldName === next.fieldName && prev.value === next.value);

const ImportantInfoCard=({nutritionalData, allergenData, modalOpen, openModal, closeModal}:ImportantInfoCardProps) =>
{
    return(
        <Card sx={{backgroundColor: '#F2EEEA'}}>
            <CardHeader sx={{
                fontWeight: 500, 
                textAlign: 'center',
                backgroundColor: '#b5222e',
                color: 'white',
                '&.MuiCardHeader-root': 
                {
                    p: '8px', 
                    pl: 1, 
                    pr: 1,
                }}} title={
                <Typography color='inherit' variant='h4' fontSize={20} fontWeight={500}>
                    IMPORTANT INFORMATION
                </Typography>
                }/>
                <CardContent sx={{
                        '&.MuiCardContent-root':
                        {
                            padding: '5px'
                        }
                    }}>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                            <Typography margin='4px' fontSize={20} color="red">
                                Allergens
                            </Typography>
                            <Typography margin='4px' fontSize={20} color="red">
                                {allergenData ? allergenData : <>Unavailable</>}
                            </Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                            <Typography margin='4px' fontSize={20}>
                                Nutritional Info
                            </Typography>
                            <Button sx={{borderRadius: 3}}variant='outlined'onClick={openModal} disabled={!nutritionalData}>{nutritionalData ? (<>View</>):(<>Unavailable</>)}</Button>
                            <Modal open={modalOpen} onClose={closeModal} aria-labelledby="nutrition-data-popup" aria-describedby="nutrition-data-popup-desc">
                            <Box sx={popupStyle}>
                                {(!nutritionalData) ? (
                                        <>
                                        <Typography id="nutrition-data-popup" variant="h6">
                                            No Nutritional Data Available
                                        </Typography>
                                        <Typography id="nutrition-data-popup-desc" sx={{ mt: 2 }}>
                                        </Typography>
                                        </>
                                    ):(
                                        <>
                                        <Typography className="nutrition-data-popup" variant="h5" sx={{fontWeight: 1000, alignSelf: 'center', pb: 2}}>
                                            Nutrition Facts
                                        </Typography>
                                        {
                                            Object.entries(nutritionalData).map(([key, value], index) => (key !== 'name') ? (
                                                <NutritionalDataRow key={index} fieldName={key} value={value}/>
                                            ): (<React.Fragment/>))
                                        }
                                        </>
                                    )
                                }
                            </Box>
                            </Modal>
                        </Box>
                    </Box>
                </CardContent>
        </Card>
    )
}
export default ImportantInfoCard