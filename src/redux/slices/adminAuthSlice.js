import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aside: false,
  name: "Admin"
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    navbarToggle: (state) => {
      state.aside = !state.aside;
    },
  },
});

export const { navbarToggle } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
