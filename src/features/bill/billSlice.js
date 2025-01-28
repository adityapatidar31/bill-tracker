import { createSlice } from "@reduxjs/toolkit";
const { v4: uuidv4 } = require("uuid");

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
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addBill(state, action) {
      state.bills.push(action.payload);
    },
  },
});

export const { addBill } = billSlice.actions;

export default billSlice.reducer;
