import React, { useState , useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material';
import { useNavigate , useLocation } from 'react-router-dom';
import userStore from "../../Store/userStore";
import SnackBar from "../SnackBar/SnackBar.jsx";
import SignupBackImg from '../SignupPage/SingnupBackImg.jsx';
import SignupGoogleBtn from '../SignupPage/SignupGoogleBtn.jsx';
import OTPDialogbox from '../OtpDialogbox/OtpDialogbox.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, verifyLoginUser , message, type, status, redirectUrl, setIsLoggedIn } = userStore();
  const [submitted , setSubmitted] = useState(false);
  const [formData, setFormData] = useState({email: '' , password: ''});
  const [errorData , setErrorData] = useState({ email: false, password: false })
  const [open, setOpen] = useState(false);
  const [openLocal , setOpenLocal] = useState(false);
  const [otpOpen , setOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackLocal , setSnackLocal] = useState({ message: "" , type: ""});

  useEffect(() => {
    if(submitted) {
      setLoading(false);
      if(status === 200) {
        if(type === 'info') {
          setOtpOpen(true);
        } else {
          setIsLoggedIn(true);
          navigate(redirectUrl , {
            state: {
              message , type
            }, replace: true  //this clears the browser history that after navigate "/" not to go login page
          })
        }
      } else {
        setOpen(true)
        setOtpOpen(false)
      }
    }
    setSubmitted(false)
  }, [message, navigate, status, type, redirectUrl, submitted, setIsLoggedIn])

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const error = query.get('error');

    if(error === 'google') {
      setSnackLocal({ message: "Login failed" , type: "error" })
      setOpen(true);
    }

    window.history.replaceState({}, '', '/users/login');
  }, [location.search])

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
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!e.target.checkValidity()) {
      setSnackLocal({ message: "Form is invalid! check the fields" , type: "error"});
      setOpenLocal(true);
      setFormData({ email: '', password: '' });
    } else {
      setLoading(true);
      await loginUser(formData);
      setFormData({
        email: '',
        password: '',
      });
      setOpen(true);
      setSubmitted(true);
    }
  };

  const handleOtpVerify = async(otp) => {
    await verifyLoginUser(otp);
    setOtpOpen(false);
    setSubmitted(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    if (open) setOpen(false);
    if (openLocal) setOpenLocal(false);
  };

  const fetchSignupForm = () => navigate("/users/signup");

  return (
    <>
    <Grid
      container
      sx={{
        height: "100vh",
        mx: { xs: 2, sm: 4, md: 6 },
        my: 4,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
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
            borderRadius: 3,
            backgroundColor: '#111',
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, color: 'white', textAlign: 'center' }}
          >
            Log In
          </Typography>

          <SignupGoogleBtn type={"Log In"}/>

          <Divider sx={{ my: 2, backgroundColor: '#444' }}>or</Divider>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              error={errorData.email}
              helperText={
                errorData.email ? "Please enter a valid email" : ""
              }
              InputLabelProps={{ style: { color: '#aaa' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              error={errorData.password}
              inputProps={{
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$"
              }}
              helperText={
                errorData.password ? "Please enter a valid password between 8-12 letters" : ""
              }
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
              Log In
            </Button>
            <p className='text-gray-400 my-2 text-center'>not registered</p>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={fetchSignupForm}
              sx={{
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
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Grid>

      <SignupBackImg/>
      
    </Grid>

    {loading && (
      <Box sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1300
      }}>
        <CircularProgress color="primary" />
      </Box>
    )}

    <SnackBar open={open} onClose={handleClose} message={message} type={type} />
    <SnackBar open={openLocal} onClose={handleClose} message={snackLocal.message} type={snackLocal.type}/>
    <OTPDialogbox open={otpOpen} onClose={() => setOtpOpen(false)} onVerify={handleOtpVerify}/>
    </>
  );
}