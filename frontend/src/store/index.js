import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import stationReducer from "./slices/stationSlice";
import scheduleReducer from "./slices/scheduleSlice";
import notificationReducer from "./slices/notificationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    station: stationReducer,
    schedule: scheduleReducer,
    notification: notificationReducer,
  },
});
