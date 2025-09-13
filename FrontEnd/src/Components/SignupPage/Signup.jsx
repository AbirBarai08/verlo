import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userStore from '../../Store/userStore.js';
import SnackBar from "../SnackBar/SnackBar.jsx";
import SignupBackImg from './SingnupBackImg.jsx';
import SignupGoogleBtn from './SignupGoogleBtn.jsx';
import OTPDialogbox from '../OtpDialogbox/OtpDialogbox.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openLocal, setOpenLocal] = useState(false);
  const [snackLocal, setSnackLocal] = useState({ message: "", type: "" });
  const { signupUser, verifySignupUser, message, type, status, redirectUrl, setIsLoggedIn } = userStore();
  const [submitted, setSubmitted] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorData, setErrorData] = useState({
    username: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (submitted) {
      setLoading(false); 
      if (status === 200) {
        if (type === 'info') {
          setOtpOpen(true);
        } else {
          setIsLoggedIn(true);
          navigate(redirectUrl, {
            state: { message, type },
            replace: true
          });
        }
      } else {
        setOpen(true);
        setOtpOpen(false);
      }
    }
    setSubmitted(false);
  }, [status, message, type, navigate, submitted, redirectUrl, setIsLoggedIn]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrorData((prev) => ({
      ...prev,
      [e.target.name]: !e.target.validity.valid
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setSnackLocal({ message: "Form is invalid! check the fields", type: "error" });
      setOpenLocal(true);
      setFormData({ username: '', email: '', password: '' });
      setOtpOpen(false);
    } else {
      setLoading(true);
      await signupUser(formData);
      setFormData({ username: '', email: '', password: '' });
      setOpen(true);
      setSubmitted(true);
    }
  };

  const handleOtpVerify = async (otp) => {
    await verifySignupUser(otp);
    setOtpOpen(false);
    setSubmitted(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    if (open) setOpen(false);
    if (openLocal) setOpenLocal(false);
  };

  const fetchLoginForm = () => navigate("/users/login");

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
          size={{ xs: 12, md: 6 }}
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
              Sign Up
            </Typography>

            <SignupGoogleBtn type={"Sign Up"} />

            <Divider sx={{ my: 2, backgroundColor: '#444' }}>or</Divider>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                error={errorData.username}
                inputProps={{
                  pattern: "[A-Za-z0-9_]{3,30}",
                }}
                helperText={
                  errorData.username ? "Please enter a valid username between 3-30 letters" : ""
                }
                InputLabelProps={{ style: { color: '#aaa' } }}
                InputProps={{ style: { color: '#fff' } }}
              />
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
                Sign Up
              </Button>
              <p className='text-gray-400 my-2 text-center'>already registered</p>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={fetchLoginForm}
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
                Log In
              </Button>
            </Box>
          </Paper>
        </Grid>

        <SignupBackImg />
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
      <SnackBar open={openLocal} onClose={handleClose} message={snackLocal.message} type={snackLocal.type} />
      <OTPDialogbox open={otpOpen} onClose={() => setOtpOpen(false)} onVerify={handleOtpVerify} />
    </>
  );
}