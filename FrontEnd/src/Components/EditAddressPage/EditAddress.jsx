import ProfileBackImg from "../ProfilePage/ProfileBackImg.jsx"
import { useState , useEffect } from "react"
import { useLocation , useNavigate } from "react-router-dom";
import { Grid , Paper , Box , TextField , Button , Typography } from "@mui/material";
import SnackBar from '../SnackBar/SnackBar.jsx';
import userStore from "../../Store/userStore.js";

export default function EditAddress() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;
    const [formData , setFormData] = useState({ city: "", landmark: "", district: "" , state: "", pincode: "" });
    const [errorData , setErrorData] = useState({ city: false, landmark: false, state: false, pincode: false });
    const { fetchUser , editAddress , user , message , type , status } = userStore();
    const [open , setOpen] = useState(false);
    const [submitted , setSubmitted] = useState(false);
    const redirectPage = sessionStorage.getItem("redirectUrl") || "";

    useEffect(() => {
        fetchUser();
    },[fetchUser]);

    useEffect(() => {
        if(user?.address) {
            setFormData({
                city: user.address.city || "",
                landmark: user.address.landmark || "",
                district: user.address.district || "",
                state: user.address.state || "",
                pincode: user.address.pincode || "",
            })
        }
    }, [user]);

    useEffect(() => {
        if(submitted) {
            if (status === 200) {
                if(redirectPage === "https://verlo-8txq.onrender.com/products/buynow/:productId") {
                    navigate("/products/buynow", {
                        state: {
                            message , type
                        },
                        replace: true
                    });
                } else {
                    navigate("/users/profile", {
                        state: {
                            message , type
                        },
                        replace: true
                    });
                }
            } else {
                setOpen(true);
            }
            setSubmitted(false);
        }
    }, [navigate , submitted , message , type , status , redirectPage])

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
        await editAddress({ ...formData , id })
        setSubmitted(true);
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
                        Address
                    </Typography>
                    <TextField
                        fullWidth
                        label="City / Village"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.city}
                        inputProps={{
                            pattern: ".{1,30}",
                        }}
                        helperText={
                            errorData.city ? "Please enter a valid city name" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="Nearby Landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.landmark}
                        inputProps={{
                            pattern: ".{1,30}",
                        }}
                        helperText={
                            errorData.landmark ? "Please enter a valid landmark name" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.district}
                        inputProps={{
                            pattern: ".{1,30}",
                        }}
                        helperText={
                            errorData.landmark ? "Please enter a valid district name" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.state}
                        inputProps={{
                            pattern: ".{1,30}",
                        }}
                        helperText={
                            errorData.state ? "Please enter a valid state name" : ""
                        }
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#aaa' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        fullWidth
                        label="Pin Code"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={errorData.pincode}
                        inputProps={{ pattern: "\\d{4,6}" }}
                        helperText={
                            errorData.pincode ? "Please enter a valid pincode" : ""
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
                        Add Address
                    </Button>
                </Box>
                </Paper>
            </Grid>

            <ProfileBackImg/>
            
            </Grid>
            <SnackBar open={open} onClose={handleClose} message={message} type={type}/>
        </>
    )
}