import { configureStores } from "@reduxjs/toolkit";
import { billSlice } from "./features/bill/billSlice.js";

const store = configureStores({
  reducer: {
    bill: billSlice,
  },
});

export default store;
