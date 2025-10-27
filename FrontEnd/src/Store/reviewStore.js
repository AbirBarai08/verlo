import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Utils/apiConfig.js';

const useReviewStore = create((set) => ({
    message: "",
    type: "",
    status: 200,
    currReviews: [],

    addReview: async({ productId, rating, review }) => {
        try {
            const res = await axios.post(`${BASE_URL}/reviews/addreview` , { productId, rating, review } , {
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    fetchReviews: async(id) => {
        try {
            const res = await axios.get(`${BASE_URL}/reviews/${id}` , {
                withCredentials: true
            });
            set({
                currReviews: res.data.reviews,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    deleteReview: async(reviewId , productId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/reviews/deletereview` , {
                params: { reviewId , productId },
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            });
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    addFeedback: async({productId , message}) => {
        try{
            const res = await axios.post(`${BASE_URL}/reviews/addfeedback` , {productId , message} , {
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    deleteFeedback: async(feedbackId , productId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/reviews/deletefeedback` , {
                params: { feedbackId , productId },
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            });
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    }
}))

export default useReviewStore;