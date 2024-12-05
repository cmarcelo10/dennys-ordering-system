import React from "react";
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogTitle } from "@mui/material";

interface CallServerDialogProps
{
    open: boolean,
    onConfirm: ()=> void,
    onCancel: ()=> void,
}

const CallServerDialog = ({open, onConfirm, onCancel}:CallServerDialogProps) =>
(
    <Dialog open={open}>
        <DialogTitle>
            Call Server
        </DialogTitle>
        <Button onClick={onCancel}>
            Cancel
        </Button>
        <Button onClick={onConfirm}>
            Confirm
        </Button>
    </Dialog>
)

export default CallServerDialog
