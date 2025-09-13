import ProfileBackImg from "../ProfilePage/ProfileBackImg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Grid , Paper , Box , TextField , Button , Typography , MenuItem } from "@mui/material";
import SnackBar from "../SnackBar/SnackBar.jsx";

export default function AddPrice() {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({ discountType: "", discountValue: "", validUntil: "", catagory: "", stock: "" });
    const [open, setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: "" });
    const [errorData , setErrorData] = useState({ discountValue: false, validUntil: false, catagory: false, stock: false });
    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if(e.target.validity && e.target.validity.valid) {
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

        const isEmpty = !formData.discountType || !formData.discountValue || !formData.validUntil || !formData.catagory || !formData.stock;
        if(isEmpty) {
            setOpen(true)
            setSnack({message: "Please fill the pricing details properly" , type: "error"})
            return
        }
        
        const existing = JSON.parse(sessionStorage.getItem("stagedProduct")) || {};
        const updated = {...existing, ...formData};
        sessionStorage.setItem("stagedProduct", JSON.stringify(updated));

        setErrorData({ discountValue: false, validUntil: false, catagory: false, stock: false })

        navigate("/products/addproducts/addimages" , {
            state : {
                message: "Pricing details added successfully",
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
                        Add Price
                    </Typography>
                    <TextField
                        fullWidth
                        label="Discount Type"
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                        margin="normal"
                        required
                        select
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    >
                       <MenuItem value="fixed">Fixed</MenuItem>
                       <MenuItem value="percentage">Percentage</MenuItem> 
                    </TextField>
                    <TextField
                        fullWidth
                        label="Discount Value"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.discountValue}
                        inputProps={{
                            min: 0,
                            max: 100,
                            step: 0.01,
                            pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
                        }}
                        helperText={
                            errorData.discountValue ? "Please enter a valid discount value between 0-100" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="Offer Valid Till"
                        name="validUntil"
                        type="date"
                        value={formData.validUntil}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.validUntil}
                        inputProps={{
                            min: today,
                        }}
                        helperText={
                            errorData.validUntil ? "Please enter a valid date" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ shrink: true, style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="Catagory"
                        name="catagory"
                        value={formData.catagory}
                        onChange={handleChange}
                        margin="normal"
                        required
                        select
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    >
                       <MenuItem value="fashion">Fashion</MenuItem>
                       <MenuItem value="mobiles">Mobiles</MenuItem>
                       <MenuItem value="electronics">Electronics</MenuItem>
                       <MenuItem value="home & furniters">Home & Furniters</MenuItem>
                       <MenuItem value="appliances">Appliances</MenuItem>
                       <MenuItem value="toys">Toys</MenuItem> 
                    </TextField>
                    <TextField
                        fullWidth
                        label="Stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.stock}
                        inputProps={{
                            pattern: "\\d+",
                        }}
                        helperText={
                            errorData.stock ? "Please enter a valid stock number" : ""
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
                        Add Price
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