import { Box, Typography, Rating , Button } from "@mui/material";
import { useEffect , useState } from "react";
import userStore from "../../../Store/userStore";
import useReviewStore from "../../../Store/reviewStore";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../../Store/productStore";

export default function Review({ product }) {
  const { fetchUser , user , isLoggedIn } = userStore();
  const navigate = useNavigate();
  const [submitted , setSubmitted] = useState(false);
  const { deleteReview , message , type , status } = useReviewStore();
  const reviews = product.reviews || [];
  const shouldScroll = reviews.length > 3;
  const { fetchProduct } = useProductStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if(submitted) {
      if(status === 200) {
        navigate("/products/" + product._id , {
          state: { message , type }
        });
      }
    }
    setSubmitted(false);
  }, [submitted , status , message , type , navigate , product._id]);

  const handleDelete = async(reviewId) => {
    await deleteReview(reviewId , product._id);
    setSubmitted(true);
    await fetchProduct(product._id);
  }

  return (
    <Box className="w-[100%] lg:w-[50%] mt-10 lg:mt-0 px-10">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "900" }}>
        Comments
      </Typography>

      <Box
        sx={{
          maxHeight: shouldScroll ? 450 : "auto",
          overflowY: shouldScroll ? "auto" : "visible",
          pr: 1
        }}
      >
        {reviews.map((review, index) => (
          <Box key={index} className="flex flex-col mt-5">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "700" }}>
              {review?.owner?.username}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 1 , sm: 2} }}>
              <Rating
                name="size-small"
                readOnly
                value={review?.rating}
                precision={1}
                size="small"
                className="product-ratings"
              />
              <Typography className='product-ratings-number' variant="body2" sx={{ fontSize: '0.85rem' }}>
                {review?.rating.toFixed(1)}
              </Typography>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              {review?.review}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }).format(new Date(review?.createdAt))}
            </Typography>
            {
              isLoggedIn && user._id === review?.owner._id && (
                <Button
                  onClick={() => handleDelete(review?._id)}
                  sx={{
                    marginTop: "1rem",
                    height: "2rem",
                    width: "10rem",
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#333333',
                    }
                  }}
                >
                  Delete
                </Button>
              )
            }
          </Box>
        ))}
      </Box>
    </Box>
  );
}