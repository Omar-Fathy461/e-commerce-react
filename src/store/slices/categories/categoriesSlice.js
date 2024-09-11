import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from '../../../utils/AxiosConfig'

const getCategories = createAsyncThunk("categories/getCategories", async (_,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await AxiosConfig({
            method: "get",
            url: "collections"
        })
        return data
    } catch (error) {
        return rejectWithValue(error.data.message)
    }
})


const initialState = {
    items: [],
    loading: false,
    error: null
    };

const categoriesSlice = createSlice({
    name:"categories" , 
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategories.pending, (state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategories.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export {getCategories}
export default categoriesSlice.reducer
