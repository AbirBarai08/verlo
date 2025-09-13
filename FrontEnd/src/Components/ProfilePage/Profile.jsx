import ProfileBackImg from "./ProfileBackImg.jsx";
import { Grid , Typography , Paper , Button , Divider } from "@mui/material";
import { useEffect , useState } from 'react';
import { useNavigate } from "react-router-dom";
import SnackBar from '../SnackBar/SnackBar.jsx';
import ProfileAddress from "./ProfileAddress.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";
import userStore from '../../Store/userStore.js';

export default function Profile() {
    const navigate = useNavigate();
    const [snack , setSnack] = useState({ message: "" , type: "" });
    const [open , setOpen] = useState(false);
    const { fetchUser, user, upgradeToSeller, message, type, status } = userStore();
    const [submitted , setSubmitted] = useState(false);

    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        fetchUser();
    }, [fetchUser])

    useEffect(() => {
        if(submitted) {
            if(status === 200) {
                navigate("/" , {
                    state: {
                        message , type
                    }, replace: true
                })
            }
        }
    }, [status , message , type , navigate , submitted])

    const handleUpgrade = async() => {
        await upgradeToSeller(user._id);
        setSubmitted(true);
    }

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
                    size={{ xs:12 , md:6}}
                    className="flex items-center justify-center text-white bg-black"
                    sx={{ px: { xs: 2, sm: 4 }}}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 4,
                            width: '100%',
                            maxWidth: 400,
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
                            }}
                        >
                            Profile
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: '#ccc', textAlign: 'center', fontWeight: 500 }}>
                            {user.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ color: '#aaa', textAlign: 'center', fontWeight: 400, fontSize: '0.95rem' }}>
                            {user.email}
                        </Typography>
                        <Divider sx={{ my: 2, backgroundColor: '#333' }} />
                        {
                            user.address
                            ?
                            <>
                                <Typography variant="body2" gutterBottom sx={{ color: '#888', textAlign: 'center', fontWeight: 300 , fontSize: '0.95rem' , mt: 1 }}>
                                    {[ user.address.city , user.address.landmark , user.address.district , user.address.state , user.address.pincode].filter(Boolean).join(',')}
                                </Typography>
                                <ProfileAddress type={"Edit"} id={user._id}/>
                            </>
                            :
                            <ProfileAddress type={"Add"} id={user._id}/>
                        }
                        {
                            user.type === "buyers" &&
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
                                onClick={handleUpgrade}
                                >
                                Upgrade to Sellers
                            </Button>
                        }
                    </Paper>
                </Grid>
                <ProfileBackImg/>
            </Grid>
            <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}