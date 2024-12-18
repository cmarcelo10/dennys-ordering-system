import React, { useContext, useState } from "react"
import DiscountItem from "../types/DiscountItem"
import { Box, IconButton, Breadcrumbs, Typography, Divider, Stack, Card, CardHeader, CardContent, Button } from "@mui/material"
import { Link } from "react-router-dom"
import theme from "../styles/Theme"
import { DiscountList } from "../types/DiscountMenuItems"
import { CartContext } from "../contexts/CartContext"
import { CheckRounded } from "@mui/icons-material"
import TopSnackbarEnhanced from "../components/TopSnackbarEnhanced"
import DebugFab from "../components/DebugFab"
import SadFace from '@mui/icons-material/SentimentDissatisfiedRounded';
const DealsPage = ()=>
{
    const {cartItems} = React.useContext(CartContext);
    const { appliedDiscounts, applyDiscount } = useContext(CartContext);
    const [open, setOpen] = React.useState(false);
    const [failure, setFailure] = React.useState(false);

    const handleApplyDiscount = (itemName: string) => {
        if(!appliedDiscounts.includes(itemName) && Object.values(cartItems).find((item)=>item.item.name === itemName)){
            applyDiscount(itemName);
            setOpen(true);
        }
        else
        {
            setFailure(true);
        }
    };
    function closeSnackbar()
    {
        setFailure(false);
        setOpen(false);
    }

    return(
        <>
            <TopSnackbarEnhanced open={open} onClose={closeSnackbar} timeout={2500} className='successSnackbar' 
                color={theme.palette.success.contrastText} 
                backgroundColor={theme.palette.success.main} 
                message={<Typography fontWeight={500} fontSize={18}>Deal Applied!</Typography>}
                action={<CheckRounded sx={{fontWeight: 1000}}fontSize='large'/>}
                />
            <TopSnackbarEnhanced open={failure} onClose={closeSnackbar} timeout={2500} className='failureSnackbar' 
                color={theme.palette.error.contrastText} 
                backgroundColor={theme.palette.error.main} 
                message={<Typography fontWeight={500} fontSize={18}>
                    No Items Qualify
                    </Typography>}
                action={<SadFace sx={{fontWeight: 1000}}fontSize='large'/>}
                />
            <DebugFab show={false} onClick={()=>setFailure(true)} />
            <Typography sx={{paddingTop: 1, width: '100%'}} variant='h2' fontFamily={'Roboto'} color={theme.palette.dennysRed.main} textAlign="center" fontWeight={555} fontSize={30}>Deals and Promos</Typography>
            <Divider variant='middle'/>
            <Stack spacing={3} sx={{paddingTop: 3, paddingBottom: 3, overflowY: 'scroll'}}>
                {
                   DiscountList.map(item=>(
                    <Card key={item.name} elevation={5} sx={{display: "flex", flexDirection: 'column', borderRadius: 8, backgroundColor: "#F2EEEA"}}>
                            <Box padding='4px' paddingLeft={1} paddingRight={1}>
                                <CardHeader sx={{
                                    fontWeight: 500, 
                                    '&.MuiCardHeader-root': 
                                    {
                                        p: '8px', 
                                        pl: 1, 
                                        pr: 1,
                                    }
                                }} title={
                                    <Typography variant='h4' fontSize={28} fontWeight={500}>
                                        {item.name}
                                        </Typography>
                                    }/>
                                <CardContent sx={{
                                    textAlign: 'left', 
                                    textJustify: 'justify', 
                                    '&.MuiCardContent-root':
                                    {
                                        padding: '2px'
                                    }
                                    }}>
                                    <Box display='flex' flexDirection={'row'} alignItems={'top'}  justifyContent={'space-between'}>
                                        <Typography fontSize={14}  sx={{textAlign: 'justify', textJustify: 'justify', padding: '4px', maxLines: 4, overflow: 'hidden', paddingTop: 0}} variant='body1' color="black">{item.description}</Typography>
                                        <Box display='flex' flexDirection='column' textAlign={'right'}>
                                        {/* <Box component='img' height={imageDimensions.height} width={imageDimensions.width} paddingLeft={1} borderColor={'black'} src={item.image}/> */}
                                            {/* <Typography margin='4px' fontSize={20} fontWeight={500}> $19.99</Typography> */}
                                        </Box>
                                
                                    </Box>
                                    
                                </CardContent>
                            </Box>
                            <Box 
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'absolute' },
                                    alignItems: 'center',
                                    mt: { xs: 2, md: 0 },
                                }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleApplyDiscount(item.appliesTo)}
                                    sx={{
                                        backgroundColor: theme.palette.dennysRed.main,
                                        width: { xs: '100%', md: 'auto' }, 
                                        maxWidth: '200px', 
                                        marginBottom: '1rem',
                                    }} disabled={appliedDiscounts.includes(item.appliesTo)}>
                                    {appliedDiscounts.includes(item.appliesTo)
                                    ? "Applied"
                                    : "Apply"}
                                </Button>
                             </Box>   
                    </Card>)) 
                }
            </Stack>
        </>
    )
}
export default DealsPage