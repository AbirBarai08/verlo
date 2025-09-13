import UpdateImages from "./UpdateImages.jsx";
import { useState } from "react";
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar.js';
import PageLayout from "../PageLayout.jsx";

export default function UpdateImagesPage() {
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
        
    useLocationSnackbar(setSnack , setOpen);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <PageLayout>
                <UpdateImages/>
            </PageLayout>
            <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}