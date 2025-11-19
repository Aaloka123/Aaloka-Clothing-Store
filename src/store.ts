// src/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import adminProductsReducer from "./adminProductSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"; // <-- import user slice

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  adminProducts: adminProductsReducer,
  cart: cartReducer,
  users: userReducer, // <-- add user slice here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
