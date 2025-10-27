import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Utils/apiConfig.js';

const useWishlistStore = create((set) => ({
  likedItems: [],
  message: "",
  type: "",

  fetchLikedItems: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/wishlist`, {
        withCredentials: true
      });
      set({ likedItems: res.data.likedItems });

      if(res.data.type === "info") {
        set({
          message: res.data.message,
          type: "info"
        })
      }
    } catch(err) {
      set({
        message: err.response?.data.message || "Failed to fetch wishlist items",
        type: err.response?.data.type || "error",
      })
    }
  },

  toggleLike: async (id) => {
    try{
      const res = await axios.post(`${BASE_URL}/products/wishlist/add`, { id }, {
        withCredentials: true
      });
      set({ 
        likedItems: res.data.likedItems,
        message: res.data.message,
        type: res.data.type,
      })
    } catch(err) {
      set({
        message: err.response?.data.message || "Failed to add to wishlist",
        type: err.response?.data.type || "error",
      })
    }
  }
}));

export default useWishlistStore;