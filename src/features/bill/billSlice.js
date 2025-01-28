import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// const bill = {
// id:0,
//   amount: 300,
//   category: "",
//   isHighlighted: false,
// description:"",
//   date: Date.now(),
// };

const initialState = {
  totalAmount: 0,
  bills: [],
  sortBy: "Date",
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addBill(state, action) {
      action.payload.id = uuidv4();
      console.log(action.payload);
      state.bills.push(action.payload);
    },
  },
});

export const { addBill } = billSlice.actions;

export default billSlice.reducer;
