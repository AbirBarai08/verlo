import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState , useEffect } from "react";
import useReviewStore from "../../../Store/reviewStore";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../../Store/productStore";

export default function ReviewDialogBox({ open, onClose , product }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [submitted , setSubmitted] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [rating , setRating] = useState(0);
  const [review , setReview] = useState("");
  const { addReview , status , message , type } = useReviewStore();
  const fetchProduct = useProductStore((state) => state.fetchProduct);

  useEffect(() => {
    if(submitted) {
      if(status === 200) {
        navigate("/products/" + product._id , {
          state: { message , type }
        });
      }
    }
    setSubmitted(false);
  },[submitted , status , message , type , navigate , product._id]);

  const handleChange = (e) => {
    setReview(e.target.value)
  }

  const handleSubmit = async() => {
    setReview("");
    await addReview({ productId: product._id, rating, review });
    setSubmitted(true);
    await fetchProduct(product._id);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center", fontFamily: "serif", fontSize: "1.5rem" }}>
        Write a Review
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Your Rating
              </Typography>
              <Rating 
                name="rating"
                defaultrating={rating}  
                size={isSmallScreen ? "small" : "large"} 
                onChange={(e , newValue) => {
                  setRating(newValue)
                }}/>
            </Box>
            <Box className="w-30 h-30 sm:w-40 sm:h-40 rounded-lg shrink-0">
                <img
                  className="w-full h-full object-fill rounded-lg"
                  src={product.images[0].url}
                  alt={product.name}
                />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Your Review
            </Typography>
            <TextField
              name="review"
              multiline
              rows={4}
              fullWidth
              value={review}
              onChange={handleChange}
              placeholder="Share your thoughts about the product..."
              variant="outlined"
              InputLabelProps={{ style: { color: '#000' } }}
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
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{
            borderColor: '#ccc',
            color: '#555',
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            }
          }}>
            Cancel
        </Button>
        <Button variant="contained" sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            }
          }}
          onClick={handleSubmit}>
            Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
}