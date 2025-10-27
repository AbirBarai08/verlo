import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Utils/apiConfig.js';

const useProductStore = create((set) => ({
    message: "",
    type: "",
    status: 200,
    redirectUrl: "/",
    products: [],
    product: null,
    orderItems: [],
    heroImgs: [],

    fetchAllProducts: async() => {
        try {
            const res = await axios.get(`${BASE_URL}` , {
                withCredentials: true
            });
            set({
                products: res.data.products,
                heroImgs: res.data.heroImgs
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    addProduct : async(formData) => {
        try {
            const prevUrl = sessionStorage.getItem("redirectUrl");
            const res = await axios.post(`${BASE_URL}/products/addproduct` , formData , {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
                redirectUrl: prevUrl || "/"
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    fetchProducts : async() => {
        try{
            const res = await axios.get(`${BASE_URL}/products/showproducts` , {
                withCredentials: true
            })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
                products: res.data.products,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    fetchProduct: async(id) => {
        try{
            const res = await axios.get(`${BASE_URL}/products/${id}` , {
                withCredentials: true
            })
            set({
                product: res.data,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",  
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    updateProduct: async(formData) => {
        try{
            const res = await axios.patch(`${BASE_URL}/products/updateproduct` , formData , {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true,
            })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
                products: res.data.products,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    deleteProduct: async(id) => {
        try{
            const res = await axios.delete(`${BASE_URL}/products/deleteproduct/${id}` , {
                withCredentials: true
            })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    buyProduct: async({productId , quantity}) => {
        try{
            const res = await axios.post(`${BASE_URL}/products/buyproduct` , { productId , quantity } , {
                withCredentials: true
            })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    buyCartProducts: async({items}) => {
        try{
            const res = await axios.post(`${BASE_URL}/products/buycartproducts` , { items } , {
                withCredentials: true
            })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    },

    fetchOrderItems: async () => {
        try {
            const res = await axios.get(`${BASE_URL}/products/orderitems`, {
                withCredentials: true
            });
            set({ orderItems: res.data.orderItems,
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            });
        } catch (err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            });
        }
    },

    cancelOrder: async(productId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/products/deleteorder/${productId}` , {
                withCredentials: true
            });
            set({ orderItems: res.data.orderItems })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            });
        }
    },

    addHeroImage: async(formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/products/addheroimage` , formData , {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true
            });
            set({
                heroImgs: res.data.heroImgs,
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Something went wrong",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500
            })
        }
    }
}))

export default useProductStore;