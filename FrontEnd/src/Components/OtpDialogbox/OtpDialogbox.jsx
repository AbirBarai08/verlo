import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function OTPDialogbox({ open, onClose, onVerify }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    if (!/^\d{6}$/.test(otp)) {
      setError(true);
      return;
    }
    setOtp('');
    onVerify(otp);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verify OTP</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter the 6-digit OTP sent to your email. Valid for 5 minutes
        </Typography>
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={handleChange}
          error={error}
          helperText={error ? "Enter a valid 6-digit OTP" : ""}
          InputLabelProps={{ style: { color: '#000' } }}
          inputProps={{ maxLength: 6 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          sx={{
            borderColor: '#ccc',
            color: '#555',
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            }
          }} 
          onClick={onClose}>
            Cancel
        </Button>
        <Button 
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            }
          }} variant="contained" onClick={handleSubmit}>Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
}