import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { getFxApi } from "../../services/getFx/getFx";

export const store = configureStore({
   reducer: {
      [getFxApi.reducerPath]: getFxApi.reducer,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(getFxApi.middleware),
});

setupListeners(store.dispatch);
