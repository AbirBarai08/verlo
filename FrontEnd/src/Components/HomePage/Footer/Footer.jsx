import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f9fafb',
        mt: {xs: 4, sm: 8}, pt: 4, pb: 4, borderTop: '1px solid #e0e0e0',
        bottom: 0,
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
        <FacebookIcon sx={{ fontSize: { xs: 18, sm: 24, md: 28 }, color: '#3b5998', cursor: 'pointer', '&:hover': { color: '#2d4373' } }} />
        <InstagramIcon sx={{ fontSize: { xs: 18, sm: 24, md: 28 }, color: '#E1306C', cursor: 'pointer', '&:hover': { color: '#C13584' } }} />
        <XIcon sx={{ fontSize: { xs: 18, sm: 24, md: 28 }, color: '#000', cursor: 'pointer', '&:hover': { color: '#333' } }} />
        <YouTubeIcon sx={{ fontSize: { xs: 18, sm: 24, md: 28 }, color: '#FF0000', cursor: 'pointer', '&:hover': { color: '#cc0000' } }} />
      </Box>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
        }}
      >
        VERLO Private Limited
      </Typography>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 1, color: '#666', fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' }}}
      >
        &copy; 2020-2025 Verlo.com | All rights reserved
      </Typography>
    </Box>
  );
}