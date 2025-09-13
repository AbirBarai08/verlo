import ProfileBackImg from "../ProfilePage/ProfileBackImg"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid , Paper , Box , TextField , Button , Typography } from "@mui/material";
import SnackBar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar";

export default function AddDetails() {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({ name: "", details: "", price: ""});
    const [errorData , setErrorData] = useState({ name: false, details: false, price: false });
    const [open, setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: "" });

    useLocationSnackbar(setSnack , setOpen);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if(e.target.validity.valid) {
            setErrorData((prev) => ({
                ...prev,
                [e.target.name] : false
            }))
            } else {
            setErrorData((prev) => ({
                ...prev,
                [e.target.name] : true
            }))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const isEmpty = !formData.name || !formData.details || !formData.price;
        if(isEmpty) {
            setOpen(true)
            setSnack({message: "Please fill the product details properly" , type: "error"});
            return;
        }

        const existing = JSON.parse(sessionStorage.getItem("stagedProduct")) || {};
        const updated = {...existing, ...formData};
        sessionStorage.setItem("stagedProduct", JSON.stringify(updated));

        setErrorData({ name: false, details: false, price: false });

        navigate("/products/addproducts/addprice" , {
            state: {
                message: "Product details added successfully",
                type: "success"
            }
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Grid
            container
            sx={{
                height: "100vh",
                mx: { xs: 2, sm: 4, md: 6 },
                my: 4,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 6,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#000',
            }}
            >
            {/* Left: Signup Form */}
            <Grid
                size={{ xs: 12, md: 6}}
                sx={{
                backgroundColor: '#000',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, sm: 4 },
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        width: '100%',
                        maxWidth: 400,
                        mx: 'auto',
                        backgroundColor: '#1a1a1a',
                        boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                    }}
                >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center', fontWeight: 700 }}>
                        Add Product
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.name}
                        inputProps={{
                            pattern: ".{1,30}",
                        }}
                        helperText={
                            errorData.name ? "Please enter a valid product name" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="Details"
                        name="details"
                        multiline
                        minRows={4}
                        value={formData.details}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.details}
                        inputProps={{
                            pattern: ".{1,600}",
                            style: {
                                maxHeight: '115px',
                                overflowY: 'auto',
                                color: '#fff',
                            }
                        }}
                        helperText={
                            errorData.details ? "Please enter a valid product details" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        sx={{
                            '& .MuiOutlinedInput-input': {
                                maxHeight: '115px !important',
                                overflowY: 'auto !important',
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                    borderRadius: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#2c2c2c',
                                    borderRadius: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#888',
                                    borderRadius: '8px',
                                    border: '2px solid #2c2c2c',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#aaa',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.price}
                        inputProps={{
                            pattern: "\\d+",
                        }}
                        helperText={
                            errorData.price ? "Please enter a valid price" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.2,
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: '#fff',
                            borderColor: '#fff',
                            '&:hover': {
                            backgroundColor: '#222',
                            borderColor: '#ccc',
                            },
                        }}
                    >
                    Add Details
                    </Button>
                </Box>
                </Paper>
            </Grid>

            <ProfileBackImg/>
            </Grid>
            <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}