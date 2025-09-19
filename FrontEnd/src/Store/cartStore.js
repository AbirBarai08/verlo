import { create } from 'zustand';
import axios from 'axios';
const BASE_URL = "https://verlo-server.onrender.com";

const useCartStore = create((set) => ({
    cartItems : [],
    message: "",
    type: "",

    fetchCartItems: async() => {
        const res = await axios.get(`${BASE_URL}/products/cart`, {
            withCredentials: true
        });
        set({ cartItems: res.data.cartItems});

        if(res.data.type === "info") {
            set({
                message: res.data.message,
                type: "info"
            })
        }
    },
    addToCart: async(id) => {
        const res = await axios.post(`${BASE_URL}/products/cart/add` , { id } , {
            withCredentials: true
        });
        set({ cartItems: res.data.cartItems,
            message: res.data.message,
            type: res.data.type,
        });
    },
    removeFromCart: async(id) => {
        const res = await axios.delete(`${BASE_URL}/products/cart` , {
            data: { id },
            withCredentials: true
        });
        set({ cartItems: [...res.data.cartItems],
            message: res.data.message,
            type: res.data.type
        });
    },
    updateProductNumber: async(id , quantity) => {
        const res = await axios.patch(`${BASE_URL}/products/cart` , { id , quantity} , {
            withCredentials: true,
        })
        set({ cartItems : res.data.cartItems });
    }
}))

export default useCartStore;