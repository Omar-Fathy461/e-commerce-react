import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoriesSlice from "./slices/categories/categoriesSlice";
import productsSlice from "./slices/products/productsSlice";
import cart from "./slices/shoppingCart/cartSlice";
import wishlist from "./slices/WishList/wishlistSlice";
import authSlice from "./slices/sign/authSlice";
import '../assets/sass/toastifDarkTheme.scss';

// إعدادات persist للـ cart
const cartPersistConfig = {
    key: "cart",
    storage,
    whitelist: ["items"] 
};

// إعدادات persist للـ wishlist
const wishlistPersistConfig = {
    key: "wishlist",
    storage,
    whitelist: ["items"] // تأكد من أن "items" هو الاسم الصحيح في الـ wishlist
};

// دمج الـ reducers
const rootReducer = combineReducers({
    categories: categoriesSlice,
    products: productsSlice,
    cart: persistReducer(cartPersistConfig, cart),
    wishlist: persistReducer(wishlistPersistConfig, wishlist),
    auth: authSlice,
});

// إعداد الـ store مع persist
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
    devTools: true
});

// إعداد الـ persistor
const persistor = persistStore(store);

export { store, persistor };
