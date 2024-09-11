import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import AxiosConfig from "../../../utils/AxiosConfig";

const getProductByItems = createAsyncThunk("cart/getProductByItems", async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState();
    const itemIds = Object.keys(cart.items);

    try {
        const response = await AxiosConfig.get('products', {
            params: {
                id: `in.(${itemIds.join(",")})`
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});



const initialState = {
    items:{},
    productFullInfo:[],
    loading: false,
    error: null
    }

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state, action) =>{
            const id = action.payload
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id] = 1;
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            delete state.items[id];
            state.productFullInfo = state.productFullInfo.filter(product => product.id !== id);
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(getProductByItems.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getProductByItems.fulfilled, (state, action)=>{
            state.loading = false;
            state.productFullInfo = action.payload;
        })
        builder.addCase(getProductByItems.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})


export const {addToCart, removeItem} = cartSlice.actions;
export {getProductByItems} ;
export default cartSlice.reducer;