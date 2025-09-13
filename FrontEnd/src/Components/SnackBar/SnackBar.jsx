import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar({ open, onClose, message , type }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={type}
        variant="standard"
        sx={{
          width: '100%',
          backgroundColor: '#000',       
          color: '#fff',                 
          fontWeight: 500,
          letterSpacing: 0.5,
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', 
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}