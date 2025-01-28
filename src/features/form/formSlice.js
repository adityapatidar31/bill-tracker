import { createSlice } from "@reduxjs/toolkit";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const now = new Date();
const formattedDate = formatDate(now);

const initialState = {
  description: "",
  category: "",
  amount: "",
  date: formattedDate,
  id: "",
};

const formSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addData(state, action) {
      const { description, amount, category, date, id } = action.payload;
      state.description = description;
      state.amount = amount;
      state.category = category;
      state.date = date;
      state.id = id;
    },
    clearData(state) {
      state.description = "";
      state.amount = "";
      state.category = "";
      state.date = formattedDate;
      state.id = "";
    },
  },
});

export const { addData, clearData } = formSlice.actions;

export default formSlice.reducer;
