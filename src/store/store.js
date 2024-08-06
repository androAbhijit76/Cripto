import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "../functions/CryptoSlice";

export const store = configureStore({
    reducer: {
        crypto: cryptoSlice.reducer,
  },
});
