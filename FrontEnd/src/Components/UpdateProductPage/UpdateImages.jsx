import ProfileBackImg from "../ProfilePage/ProfileBackImg"
import { useState , useEffect } from "react"
import { Grid , Paper , Box , Button , Typography } from "@mui/material";
import UpdateImageBox from "./UpdateImageBox";
import productStore from "../../Store/productStore.js";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import SnackBar from "../SnackBar/SnackBar.jsx";

export default function UpdateImages() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: "" })
    const [files , setFiles] = useState([]);
    const [submitted , setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { updateProduct , message , type , status , redirectUrl } = productStore();
    const product = JSON.parse(sessionStorage.getItem("product"));

    useEffect(() => {
        if(submitted) {
            if(status === 200) {
                navigate(redirectUrl , {
                    state: {
                        message , type
                    }, replace: true
                })
            } else {
                navigate("/products/updateproduct/updatedetails" , {
                    state: {
                        message , type
                    }, replace: true
                })
            }
        }
        setSubmitted(false)
    }, [message , navigate , redirectUrl , status , type , submitted]);

    const handleSubmit = async(e , id) => {
        e.preventDefault();

        if(files.length < 6) {
            setOpen(true)
            setSnack({ message: "Please fill the images properly" , type: "error" })
            return;
        }

        setLoading(true);

        try{
            const existing = JSON.parse(sessionStorage.getItem("stagedProduct"));
            const formData = new FormData();

            files.forEach((file) => {
                if(file.file instanceof File) {
                    formData.append("images" , file.file);
                    formData.append("indexes" , file.index);
                }
            })
            formData.append("productData" , JSON.stringify(existing));
            formData.append("id" , id);

            await updateProduct(formData);
            setSubmitted(true);
            sessionStorage.removeItem("stagedProduct");
        } catch(err) {
            setOpen(true);
            setSnack({ message: err.message , type: "error" });
        } finally {
            setLoading(false);
        }
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
            {/* Left: Signup Form */}
            <Grid
                size={{ xs: 12, md: 4}}
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
                <Box component="form" onSubmit={(e) => handleSubmit(e , product._id)} noValidate>
                    <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center', fontWeight: 700 }}>
                        Update Images
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' , justifyContent: 'center' , gap: 2, my: 2 }}>
                        {[...Array(6)].map((_, idx) => (
                            <UpdateImageBox key={idx} index={idx} setFiles={setFiles} />
                        ))}
                    </Box>

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
                        Update
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