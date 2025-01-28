import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./features/bill/billSlice";
import formReduce from "./features/form/formSlice";

export const store = configureStore({
  reducer: {
    bill: billReducer,
    form: formReduce,
  },
});
