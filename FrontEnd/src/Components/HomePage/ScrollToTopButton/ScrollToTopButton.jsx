import { useScrollTrigger, Box, Fade, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 120, // Show button after user scrolls 120px
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="button"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: '#1c1c1c',
            color: 'white',
            '&:hover': {
              backgroundColor: '#383838',
            },
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </Fade>
  );
}