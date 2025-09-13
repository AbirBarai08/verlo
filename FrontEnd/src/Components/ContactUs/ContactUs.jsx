import { Grid, Typography, Paper, TextField, Button, Divider , Backdrop , CircularProgress } from "@mui/material";
import { useState } from "react";
import SnackBar from "../SnackBar/SnackBar.jsx";
import ProfileBackImg from "../ProfilePage/ProfileBackImg.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [snack, setSnack] = useState({ message: "", type: "" });
    const [open, setOpen] = useState(false);
    const [loading , setLoading] = useState(false);

    useLocationSnackbar(setSnack , setOpen);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 

        setTimeout(() => {
            setLoading(false)
            setSnack({ message: "Message sent successfully!", type: "success" });
            setOpen(true);
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                <Grid
                    size={{ xs: 12, md: 6 }}
                    className="flex items-center justify-center text-white bg-black"
                    sx={{ px: { xs: 2, sm: 4 } }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 4,
                            width: '100%',
                            maxWidth: 500,
                            mx: 'auto',
                            background: 'linear-gradient(135deg, #0f0f0f, #1c1c1c)',
                            boxShadow: '0 8px 30px rgba(255,255,255,0.08)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 12px 40px rgba(255,255,255,0.12)',
                            },
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 4px rgba(255,255,255,0.1)',
                        }}>
                            Contact Us
                        </Typography>
                        <Divider sx={{ my: 2, backgroundColor: '#333' }} />
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                                InputLabelProps={{ style: { color: '#ccc' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                                InputLabelProps={{ style: { color: '#ccc' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                                sx={{ mb: 3 }}
                                InputLabelProps={{ style: { color: '#ccc' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />
                            <Button
                                type="submit"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    py: 1.2,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    color: '#fff',
                                    borderColor: '#fff',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    letterSpacing: '0.03em',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#222',
                                        borderColor: '#aaa',
                                        boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                                    },
                                }}
                            >
                                Send Message
                            </Button>
                        </form>
                        <Typography variant="body2" sx={{ mt: 3, color: '#888', textAlign: 'center' }}>
                            You can also reach us at <strong>abirbarai08@gmail.com</strong>
                        </Typography>
                    </Paper>
                </Grid>
                <ProfileBackImg />
            </Grid>
            <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type} />
        </>
    );
}