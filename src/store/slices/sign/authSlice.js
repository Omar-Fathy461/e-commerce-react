import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import AxiosConfig from "../../../utils/AxiosConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const registerUser = createAsyncThunk("auth/registerUser", async ({firstName,lastName,email, password}, thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await AxiosConfig.post('token', {
            firstName,
            lastName, 
            email,
            password,
        });
        toast.success('Registration successful!', {theme: "dark"});
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        return rejectWithValue(error.data.messag)
    }
})


const login = createAsyncThunk("auth/login", async ({email, password}, thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await AxiosConfig.post('token', {
            email,
            password,
        });
        toast.success('Login successful!', {theme: "dark"});
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        return rejectWithValue(error.data.messag)
    }
})

const initialState = {
    user: null,
    token: null,
    loading: false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUser.pending, (state)=> {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state , action) =>{
            state.error = action.payload;
            state.loading = false;
            toast.error('Registration failed!');
        });
        builder.addCase(login.pending, (state)=> {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            state.loading = false;
        });
        builder.addCase(login.rejected, (state , action) =>{
            state.error = action.payload;
            state.loading = false;
            toast.error('Login failed!');
        });
    }

})
export {login}
export {registerUser}
export const {logout} = authSlice.actions;
export default authSlice.reducer;