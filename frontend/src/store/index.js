import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import stationReducer from "./slices/stationSlice";
import scheduleReducer from "./slices/scheduleSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    station: stationReducer,
    schedule: scheduleReducer,
  },
});
