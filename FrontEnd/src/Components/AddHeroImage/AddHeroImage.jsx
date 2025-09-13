import ProfileBackImg from "../ProfilePage/ProfileBackImg"
import { useState , useEffect } from "react"
import { Grid , Paper , Box , Button , Typography } from "@mui/material";
import productStore from "../../Store/productStore.js";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import SnackBar from "../SnackBar/SnackBar.jsx";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function AddImages() {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [open, setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: "" })
    const [submitted , setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const [previewUrl , setPreviewUrl] = useState();
    const { addHeroImage , message , type , status } = productStore();

    useEffect(() => {
        if(submitted) {
            if(status === 200) {
                navigate("/" , {
                    state: {
                        message , type
                    }, replace: true
                })
            } else {
                navigate("/products/addheroimagedetails" , {
                    state: {
                        message , type
                    }, replace: true
                })
            }
        }
        setSubmitted(false)
    }, [message , navigate , status , type , submitted]);

    const handleChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const maxSize = 50 * 1024 * 1024;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        
        if(selectedFile.size > maxSize) {
            setOpen(true);
            setErrorMsg("Image must be less than 50MB");
            return;
        }

        if (!allowedTypes.includes(selectedFile.type)) {
            setOpen(true);
            setErrorMsg("Only JPG JPEG PNG and WEBP format not allowed");
        return;
        }

        setErrorMsg("");
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile))
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!file) {
            setOpen(true)
            setSnack({ message: "Please fill the images properly" , type: "error" })
            return;
        }

        setLoading(true);

        try{
            const existing = JSON.parse(sessionStorage.getItem("stagedProduct"));
            const formData = new FormData();

            formData.append("image" , file);
            formData.append("imageData" , JSON.stringify(existing));

            await addHeroImage(formData);
            setSubmitted(true);
            sessionStorage.removeItem("stagedProduct");
        } catch(err) {
            setOpen(true);
            setSnack({ message: err.message , type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
    };

    const handleRemove = (e) => {
        e.preventDefault();

        setFile(null);
        setPreviewUrl(null);
    }

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
                        Add Image
                    </Typography>
                    
                    <Box className="flex items-center justify-center">
                        <Box component="label" onClick={handleClick} className="sm:h-80 sm:w-80 h-56 w-56 bg-gray-400 flex items-center justify-center cursor-pointer rounded-md relative">
                            {
                                file ? (
                                    previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="preview" className="object-fill h-full w-full rounded-md"/>
                                            <DeleteForeverIcon onClick={handleRemove} fontSize="large" className={`absolute text-gray-600 bg-white rounded-full right-1.5 top-1.5 transition-transform duration-150 ease-in-out ${clicked ? 'scale-70' : 'scale-100'}`}/>
                                        </>
                                    ) : (
                                        <span className="overflow-hidden">{file.name}</span>
                                    )
                                ) : (
                                    <AddOutlinedIcon
                                    fontSize="large"
                                    className={`transition-transform duration-150 ease-in-out ${clicked ? 'scale-70' : 'scale-100'}`}
                                    />
                                )
                            }
                            <input hidden type="file" accept="image/*" onChange={handleChange} />
                        </Box>
                        {
                            errorMsg && (
                            <SnackBar open={open} onClose={handleClose} message={errorMsg} type={"error"}/>
                            )
                        }
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
                        Add HeroImage
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