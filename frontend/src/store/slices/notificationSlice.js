import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfNotification: 0,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNumberOfNotification: (state, action) => {
      state.numberOfNotification = action.payload;
    },
    increaseOne: (state) => {
      state.numberOfNotification++;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetState,
  setNumberOfNotification,
  increaseOne,
  setNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
