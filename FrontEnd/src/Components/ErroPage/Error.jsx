import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Error() {
    const location = useLocation();
    const errorData = location.state?.errorData || { statusCode: 404, message: "Page not found" };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fefefe',
            padding: 2
        }}>
            <Stack spacing={2} sx={{ maxWidth: 600, width: '100%' }}>
                <Typography variant="h5" sx={{ color: '#d32f2f', fontWeight: 600 }}>
                    Something went wrong 😞
                </Typography>
                <Alert
                    severity="error"
                    variant="outlined"
                    sx={{
                        bgcolor: '#fff4f4',
                        border: '1px solid #f44336',
                        color: '#d32f2f',
                        fontSize: '1rem',
                        padding: '16px'
                    }}
                >
                    <strong>Status: {errorData.statusCode}</strong> &nbsp;&nbsp;
                    {errorData.message}
                </Alert>
            </Stack>
        </Box>
    );
}