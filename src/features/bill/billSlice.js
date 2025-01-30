import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  totalAmount: 4164,
  pageSize: 8,
  currentPage: 3,
  filter: "",
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
    {
      description: "Lunch break",
      category: "Food & Dining",
      amount: 45,
      date: "2025-01-29",
      id: "c58a7b4d-78fc-4d85-9786-6cf8c0f2ac3g",
    },
    {
      description: "Dinner out",
      category: "Food & Dining",
      amount: 56,
      date: "2025-01-29",
      id: "c58b7b4d-78fc-4d85-9786-6cf8c0f2ac3h",
    },
    {
      description: "Grocery shopping",
      category: "Food & Dining",
      amount: 78,
      date: "2025-01-28",
      id: "c58c7b4d-78fc-4d85-9786-6cf8c0f2ac3i",
    },
    {
      description: "Shopping spree",
      category: "Shopping",
      amount: 200,
      date: "2025-01-28",
      id: "c58d7b4d-78fc-4d85-9786-6cf8c0f2ac3j",
    },
    {
      description: "New phone",
      category: "Shopping",
      amount: 999,
      date: "2025-01-27",
      id: "c58e7b4d-78fc-4d85-9786-6cf8c0f2ac3k",
    },
    {
      description: "Monthly rent",
      category: "Utility",
      amount: 1200,
      date: "2025-01-25",
      id: "c58f7b4d-78fc-4d85-9786-6cf8c0f2ac3l",
    },
    {
      description: "Electricity bill",
      category: "Utility",
      amount: 100,
      date: "2025-01-24",
      id: "c5907b4d-78fc-4d85-9786-6cf8c0f2ac3m",
    },
    {
      description: "Gas bill",
      category: "Utility",
      amount: 65,
      date: "2025-01-23",
      id: "c5917b4d-78fc-4d85-9786-6cf8c0f2ac3n",
    },
    {
      description: "Tuition fees",
      category: "Education",
      amount: 500,
      date: "2025-01-21",
      id: "c5927b4d-78fc-4d85-9786-6cf8c0f2ac3o",
    },
    {
      description: "Textbooks",
      category: "Education",
      amount: 200,
      date: "2025-01-20",
      id: "c5937b4d-78fc-4d85-9786-6cf8c0f2ac3p",
    },
    {
      description: "Gym membership",
      category: "Personal",
      amount: 30,
      date: "2025-01-19",
      id: "c5947b4d-78fc-4d85-9786-6cf8c0f2ac3q",
    },
    {
      description: "Massage",
      category: "Personal",
      amount: 75,
      date: "2025-01-18",
      id: "c5957b4d-78fc-4d85-9786-6cf8c0f2ac3r",
    },
    {
      description: "Massage therapy",
      category: "Personal",
      amount: 80,
      date: "2025-01-17",
      id: "c5967b4d-78fc-4d85-9786-6cf8c0f2ac3s",
    },
    {
      description: "Train tickets",
      category: "Travel",
      amount: 50,
      date: "2025-01-16",
      id: "c5977b4d-78fc-4d85-9786-6cf8c0f2ac3t",
    },
    {
      description: "Fuel",
      category: "Travel",
      amount: 70,
      date: "2025-01-15",
      id: "c5987b4d-78fc-4d85-9786-6cf8c0f2ac3u",
    },
    {
      description: "Taxi fare",
      category: "Travel",
      amount: 20,
      date: "2025-01-14",
      id: "c5997b4d-78fc-4d85-9786-6cf8c0f2ac3v",
    },
    {
      description: "Gifts",
      category: "Other",
      amount: 100,
      date: "2025-01-13",
      id: "c6007b4d-78fc-4d85-9786-6cf8c0f2ac3w",
    },
    {
      description: "Charity donation",
      category: "Other",
      amount: 50,
      date: "2025-01-12",
      id: "c6017b4d-78fc-4d85-9786-6cf8c0f2ac3x",
    },
  ],
  sortBy: "Date",
};

function minElementsIndices(nums, target) {
  if (target < 0 || target > 1000000) {
    console.error("Invalid target value:", target);
    return [];
  }

  let n = nums.length;
  let dp = new Array(target + 1).fill(null);
  dp[0] = [];

  for (let i = 0; i < n; i++) {
    for (let j = target; j >= nums[i]; j--) {
      if (dp[j - nums[i]] !== null) {
        let newCombination = [...dp[j - nums[i]], i];
        if (dp[j] === null || newCombination.length < dp[j].length) {
          dp[j] = newCombination;
        }
      }
    }
  }

  for (let j = target; j >= 0; j--) {
    if (dp[j] !== null) {
      return dp[j].sort((a, b) => a - b);
    }
  }

  return [];
}

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addBill(state, action) {
      action.payload.id = uuidv4();
      state.totalAmount += action.payload.amount;
      state.bills = [action.payload, ...state.bills];
      state.bills.push(action.payload);
    },
    deleteBill(state, action) {
      state.bills = state.bills.filter((bill) => {
        if (bill.id !== action.payload) return true;
        else state.totalAmount -= bill.amount;
      });
    },
    updateBill(state, action) {
      state.bills = state.bills.filter((bill) => {
        if (bill.id !== action.payload.bill.id) {
          return true;
        } else {
          state.totalAmount -= bill.amount;
          return false;
        }
      });

      state.bills = [action.payload.bill, ...state.bills];

      state.totalAmount += action.payload.bill.amount;
    },
    applyFilter(state, action) {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    payBills(state, action) {
      const amount = action.payload;
      const billsAmounts = state.bills.map((bill) => bill.amount);
      const highlightedIndices = minElementsIndices(billsAmounts, amount);
      state.bills.forEach((bill, index) => {
        if (!highlightedIndices.includes(index)) {
          bill.isHighlighted = false;
        }
      });

      highlightedIndices.forEach((index) => {
        if (state.bills[index]) {
          state.bills[index].isHighlighted = true;
        }
      });
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addBill,
  deleteBill,
  updateBill,
  applyFilter,
  payBills,
  setCurrentPage,
} = billSlice.actions;

export default billSlice.reducer;
