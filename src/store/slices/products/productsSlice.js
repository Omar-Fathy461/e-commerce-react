import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import AxiosConfig from "../../../utils/AxiosConfig"



// const getProducts = createAsyncThunk ("products/getProducts", async (categoryName)=>{
//     const response = await AxiosConfig.get(`products`,{
//         params: {
//             category: `eq.${categoryName}`,
//             },
//     });
//     return response.data;
// })

const getProducts = createAsyncThunk("products/getProducts", async ({ categoryName, color }) => {
    let params = {
        category: `eq.${categoryName}`
    };

    if (color) {
        params.color = `ilike.%${color}%`;
    }

    const response = await AxiosConfig.get(`products`, { params });
    return response.data;
});


const initialState = {
    items: [],
    loading: false,
    error: null
    };


const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state)=>{
            state.loading = true ;
            state.error = null ;
        });
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            state.loading = false ;
            state.items = action.payload ;
        });
        builder.addCase(getProducts.rejected, (state, action)=>{
            state.loading = false ;
            state.error = action.payload ;
        });
    }
})

export {getProducts}
export default productsSlice.reducer