import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "./RootReducer";
import persistStore from "redux-persist/es/persistStore";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);