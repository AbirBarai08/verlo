import { create } from 'zustand';
import axios from 'axios';
const BASE_URL = "https://e-commerce-website-1-g5ui.onrender.com";

const userStore = create((set) => ({
    message: "",
    type: "",
    status: 200,
    redirectUrl: "/",
    isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true",
    user: {},

    setIsLoggedIn: (value) => {
        sessionStorage.setItem("isLoggedIn" , value ? "true" : "false"),
        set({ isLoggedIn: value });
    },

    signupUser: async(formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/users/signup` , formData , {
                withCredentials: true
            });
            set({ message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.message || "Email must be unique",
                type: err.response?.type || "error",
                status: err.response?.status || 500,
            })
        }
    },

    verifySignupUser: async(otp) => {
        try {
            const prevUrl = sessionStorage.getItem("redirectUrl"); 
            const res = await axios.post(`${BASE_URL}/users/verify-signup` , { otp } , {
                withCredentials: true,
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
                redirectUrl: prevUrl || "/",
            })
        } catch(err) {
            set({
                message: err.response?.message || "Invalid OTP",
                type: err.response?.type || "error",
                status: err.response?.status || 500,
            })
        }
    },

    loginUser: async(formData) => {
        try{
            const res = await axios.post(`${BASE_URL}/users/login` , formData , {
                withCredentials: true
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Invalid credentials",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500,
            })
        }
    },

    verifyLoginUser: async(otp) => {
        try {
            const prevUrl = sessionStorage.getItem("redirectUrl"); 
            const res = await axios.post(`${BASE_URL}/users/verify-login` , { otp } , {
                withCredentials: true,
            });
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
                redirectUrl: prevUrl || "/",
            })
        } catch(err) {
            set({
                message: err.response?.message || "Invalid OTP",
                type: err.response?.type || "error",
                status: err.response?.status || 500,
            })
        }
    },

    fetchUser: async() => {
        const res = await axios.get(`${BASE_URL}/users/profile` , {withCredentials: true})
        set({
            user: res.data,
        })
    },

    addAddress: async(formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/users/addaddress`, formData , { withCredentials: true })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "User not found",
                type: err.response?.data.type || "error",
                status: err.response?.status || 400,
            })
        }
    },

    editAddress: async(formData) => {
        try {
            const res = await axios.patch(`${BASE_URL}/users/updateaddress`, formData , { withCredentials: true })
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "User not found",
                type: err.response?.data.type || "error",
                status: err.response?.status || 400,
            })
        }
    },

    upgradeToSeller: async(id) => {
        try {
            const res = await axios.post(`${BASE_URL}/users/upgradetoseller` , { id } , {
                withCredentials: true,
            })
            set({
                message: res.data.message,
                type: res.data.type,    
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "Upgradation failed",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500,
            })
        }
    },

    logoutUser: async() => {
        try{
            const res = await axios.post(`${BASE_URL}/users/logout` , {
                withCredentials: true
            });
            sessionStorage.removeItem("isLoggedIn");
            set({
                message: res.data.message,
                type: res.data.type,
                status: res.status,
            })
        } catch(err) {
            set({
                message: err.response?.data.message || "logout failed",
                type: err.response?.data.type || "error",
                status: err.response?.status || 500,
            })
        }
    }
}))

export default userStore;