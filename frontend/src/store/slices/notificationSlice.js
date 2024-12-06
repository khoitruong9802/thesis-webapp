import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfNotification: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setNumberOfNotification: (state, action) => {
      state.notifications = action.payload.data;
      state.totalNotification = action.payload.totalCount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetState, setNumberOfNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
