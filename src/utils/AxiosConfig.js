import axios from "axios";
import serverErrorHandler from "./serverErrorHandler";
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_BASE_URL ;
const apikey = import.meta.env.VITE_API_KEY ;


const AxiosConfig = axios.create({
    baseURL,
    headers:{
        apikey,
        "Content-Type": "application/json",
        
    }
});
// Add a response interceptor
AxiosConfig.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
    }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorMessage = serverErrorHandler(error)
    toast.error(errorMessage , {theme: "dark",})
    console.log(errorMessage);
    return Promise.reject(error);
    });

export default AxiosConfig