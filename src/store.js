import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./features/bill/billSlice";

export const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});
