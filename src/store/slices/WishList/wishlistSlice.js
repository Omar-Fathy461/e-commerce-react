import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../../../utils/AxiosConfig";

const getProductDetails = async (id) => {
    try {
        const response = await AxiosConfig.get(`products?id=eq.${id}`);
        if (response.data.length > 0) {
            const product = response.data[0];
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            };
        }
        throw new Error("Product not found");
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};

const wishlistAction = createAsyncThunk("wishlist/wishlistAction", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const productDetails = await getProductDetails(id);

        if (!productDetails) {
            throw new Error("Product details are undefined");
        }

        const isThereItem = await AxiosConfig.get(`/wishlist?productId=eq.${productDetails.id}`);

        if (isThereItem.data.length > 0) {
            const wishlistItemProductId = isThereItem.data[0].productId;

            await AxiosConfig.delete(`/wishlist?productId=eq.${wishlistItemProductId}`);
            return { type: "remove", id: productDetails.id };
        } else {
            await AxiosConfig.post("/wishlist", {
                productId: productDetails.id,
                title: productDetails.title,
                price: productDetails.price,
                image: productDetails.image,
            });
            return { type: "add", id: productDetails.id, title: productDetails.title, price: productDetails.price, image: productDetails.image};
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    items: [],
    error: null,
    loading: false,
    count: 0
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(wishlistAction.pending, (state) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(wishlistAction.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.items.push({ id: action.payload.id, title: action.payload.title, price: action.payload.price, image: action.payload.image });
                state.count += 1;
                state.loading = false;
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                state.count -= 1;
                state.loading = false;
            }
        });
        builder.addCase(wishlistAction.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
});

export { wishlistAction };
export default wishlistSlice.reducer;