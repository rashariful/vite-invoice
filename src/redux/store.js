import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import invoiceSlice from "./features/invoiceSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
