import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface ConfirmationDialogProps
{
    open: boolean,
    cartItemID: string,
    cartItemName?: string,
    onConfirm: (itemID: string)=> void,
    onCancel: ()=> void,
}
const DeleteConfirmationDialog = ({...props}: ConfirmationDialogProps)=>
{
    function handleConfirm()
    {
        props.onConfirm(props.cartItemID);
    }
    return(
        <Dialog open={props.open}>
            <DialogTitle>
                Remove Item
            </DialogTitle>
            <DialogContent>
                Remove {props.cartItemName} from your order?
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteConfirmationDialog