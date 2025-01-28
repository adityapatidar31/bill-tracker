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
  bills: [
    {
      description: "hey there",
      category: "Travel",
      amount: 123,
      date: "2025-01-29",
      id: "c5827b4d-78fc-4d85-9786-6cf8c0f2ac3e",
    },
    {
      description: "Go there",
      category: "Travel",
      amount: 123,
      date: "2025-01-29",
      id: "c5827b4d-78fc-4d85-9786-6cf8c0f2ac3f",
    },
  ],
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
