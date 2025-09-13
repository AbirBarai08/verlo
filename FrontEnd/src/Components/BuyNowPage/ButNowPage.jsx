import PageLayout from "../PageLayout";
import BuyNow from "./BuyNow.jsx";
import SnackBar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar';
import { useState } from "react";

export default function BuyNowPage() {
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
        
    useLocationSnackbar(setSnack , setOpen);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };
    return(
        <>
            <PageLayout>
                <BuyNow/>
            </PageLayout>
            <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}