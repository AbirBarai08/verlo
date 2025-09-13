import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
    cartItems : [],
    message: "",
    type: "",

    fetchCartItems: async() => {
        const res = await axios.get("http://localhost:5000/products/cart", {
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
        const res = await axios.post("http://localhost:5000/products/cart/add" , { id } , {
            withCredentials: true
        });
        set({ cartItems: res.data.cartItems,
            message: res.data.message,
            type: res.data.type,
        });
    },
    removeFromCart: async(id) => {
        const res = await axios.delete("http://localhost:5000/products/cart" , {
            data: { id },
            withCredentials: true
        });
        set({ cartItems: [...res.data.cartItems],
            message: res.data.message,
            type: res.data.type
        });
    },
    updateProductNumber: async(id , quantity) => {
        const res = await axios.patch("http://localhost:5000/products/cart" , { id , quantity} , {
            withCredentials: true,
        })
        set({ cartItems : res.data.cartItems });
    }
}))

export default useCartStore;