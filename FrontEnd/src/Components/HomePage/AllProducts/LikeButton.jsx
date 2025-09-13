import { useState , useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useWishlistStore from '../../../Store/wishlistStore.js';
import Snackbar from '../../SnackBar/SnackBar.jsx';

export default function LikeButton({ product }) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const fetchLikedItems = useWishlistStore((state) => state.fetchLikedItems);
  const toggleLike = useWishlistStore((state) => state.toggleLike);
  const likedItems = useWishlistStore((state) => state.likedItems);
  const message = useWishlistStore((state) => state.message);
  const type = useWishlistStore((state) => state.type);

  const isLiked = likedItems.includes(product._id);

  useEffect(() => {
    fetchLikedItems();
  }, [fetchLikedItems]);

  const handleClick = async (e , id) => {
    e.stopPropagation();
    setAnimate(true);
    await toggleLike(id);
    setOpen(true);
    setTimeout(() => setAnimate(false), 300); // reset after animation
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={(e) => handleClick(e , product._id)}
        sx={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          position: 'absolute',
          top: "8px",
          right: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          cursor: 'pointer'
        }}
      >
        <Typography>
          {
            isLiked
              ? <FavoriteIcon sx={{ fontSize: 16, color: '#e91e63', transform: animate ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.5s ease'}} />
              : <FavoriteBorderIcon sx={{ fontSize: 16, color: '#555' }} />
          }
        </Typography>
      </Box>
      <Snackbar open={open} onClose={handleClose} message={message} type={type}/>
    </>
  );
}