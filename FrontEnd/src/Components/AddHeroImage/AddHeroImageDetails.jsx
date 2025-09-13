import ProfileBackImg from "../ProfilePage/ProfileBackImg.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid , Paper , Box , TextField , Button , Typography , MenuItem } from "@mui/material";
import SnackBar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";

export default function AddHeroImageDetails() {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({ title: "", subtitle: "", product: "" , catagory: "" , endDate: "" });
    const [errorData , setErrorData] = useState({ title: false, subtitle: false , catagory: false , endDate: false });
    const [open, setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: "" });
    const today = new Date().toISOString().split("T")[0];

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

        const isEmpty = !formData.title|| !formData.subtitle || !formData.catagory || !formData.endDate;
        if(isEmpty) {
            setOpen(true)
            setSnack({message: "Please fill the details properly" , type: "error"});
            return;
        }

        const existing = JSON.parse(sessionStorage.getItem("stagedProduct")) || {};
        const updated = {...existing, ...formData};
        sessionStorage.setItem("stagedProduct", JSON.stringify(updated));

        setErrorData({ title: false, subtitle: false , catagory: false , endDate: false });

        navigate("/products/addheroimage" , {
            state: {
                message: "Details added successfully",
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
                        Add Details
                    </Typography>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.title}
                        inputProps={{
                            pattern: ".{1,300}",
                        }}
                        helperText={
                            errorData.title ? "Please enter a valid HeroImage title" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.subtitle}
                        inputProps={{
                            pattern: ".{1,300}",
                        }}
                        helperText={
                            errorData.subtitle ? "Please enter a valid HeroImage subtitle" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <Box className="flex gap-2">
                        <TextField
                            fullWidth
                            label="Product"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#aaa' } }}
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
                    </Box>
                    <Box className="flex gap-2">
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
                    </Box>
                    <TextField
                        fullWidth
                        label="Offer Valid Till"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.endDate}
                        inputProps={{
                            min: today,
                        }}
                        helperText={
                            errorData.endDate ? "Please enter a valid date" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ shrink: true, style: { color: '#aaa' } }}
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