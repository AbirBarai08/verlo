import { useState , useEffect } from 'react';
import useProductStore from '../../Store/productStore.js';
import Show from './Show.jsx';
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar.js';
import PageLayout from '../PageLayout.jsx';

export default function ShowPage() {
    const {products , fetchProducts} = useProductStore();
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        fetchProducts();
    } , [fetchProducts]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
        <PageLayout>
            <Show products={products} />
        </PageLayout>
        <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}