import { Grid, Typography, Paper, Divider } from "@mui/material";
import ProfileBackImg from "../ProfilePage/ProfileBackImg.jsx";
import SnackBar from "../SnackBar/SnackBar.jsx";
import { useState } from "react";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";

export default function AboutUs() {
    const [snack, setSnack] = useState({ message: "", type: "" });
    const [open, setOpen] = useState(false);

    useLocationSnackbar(setSnack , setOpen);

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
                            About Us
                        </Typography>
                        <Divider sx={{ my: 2, backgroundColor: '#333' }} />
                        <Typography variant="body1" sx={{
                            color: '#ccc',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            textAlign: 'justify',
                        }}>
                            Welcome to our platform—a space where innovation meets simplicity. We’re a team of passionate creators, developers, and dreamers who believe in building products that solve real problems. Whether you're a buyer exploring new trends or a seller growing your brand, we’re here to empower your journey.
                        </Typography>
                        <Typography variant="body2" sx={{
                            mt: 2,
                            color: '#888',
                            fontSize: '0.95rem',
                            textAlign: 'justify',
                        }}>
                            Our mission is to deliver seamless experiences, clean architecture, and scalable solutions. We value transparency, user feedback, and continuous improvement. Thank you for being part of our story.
                        </Typography>
                    </Paper>
                </Grid>
                <ProfileBackImg />
            </Grid>
            <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type} />
        </>
    );
}