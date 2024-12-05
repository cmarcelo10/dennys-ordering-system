import React from "react";
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {styled} from '@mui/material/styles'
import theme from "../../styles/Theme";
interface CallServerDialogProps
{
    open: boolean,
    onConfirm: ()=> void,
    onCancel: ()=> void,
}
const CallServerDialogWrapper = styled(Dialog)(({theme})=>
({
    '&. MuiDialogTitle-root':
    {
        fontSize: 10,
    },
    '& .MuiDialogContent-root':
    {
        height: theme.spacing(8),
        width: theme.spacing(30),
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root':
    {
        padding: theme.spacing(1),
    }

}), );
const CallServerDialog = ({open, onConfirm, onCancel}:CallServerDialogProps) =>
(
    <CallServerDialogWrapper open={open} onClose={onCancel}>
        <DialogTitle sx={{textAlign: 'center', fontSize: 24, fontFamily: 'Roboto', fontWeight: 500,}}>
            Call Server
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Call a server to your table for help?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
        }}>
        <Button onClick={onCancel} color='error' autoFocus variant='contained'>
            Cancel
        </Button>
        <Button onClick={onConfirm}>
            Confirm
        </Button>
        </DialogActions>
    </CallServerDialogWrapper>
)

export default CallServerDialog
