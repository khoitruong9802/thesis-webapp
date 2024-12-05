import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSchedules as getSchedulesService,
  deleteSchedule as deleteScheduleService,
  createSchedule as createScheduleService,
  updateSchedule as updateScheduleService,
} from "../../services/scheduleService";
import { convertSnakeToCamel } from "../../utils/helper";

// Create the thunk
export const getSchedules = createAsyncThunk(
  "schedule/getSchedules",
  async (data, { rejectWithValue }) => {
    try {
      const [page, pageSize] = data;
      const res = await getSchedulesService(page, pageSize);
      return convertSnakeToCamel(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Create the thunk
export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createScheduleService(data);
      return convertSnakeToCamel(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Create the thunk
export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateScheduleService(data);
      return convertSnakeToCamel(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Create the thunk
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const res = await deleteScheduleService(data);
      return convertSnakeToCamel(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  schedules: [],
  totalSchedule: 0,
  readLoading: false,
  createLoading: false,
  updateLoading: false,
  error: "",
  currentPage: 1,
  editId: -1,
  showForm: false,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setSchedules: (state, action) => {
      state.schedules = action.payload.data;
      state.totalSchedule = action.payload.totalCount;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSchedules.fulfilled, (state, action) => {
      // Add user to the state array
      state.schedules = action.payload.data;
      state.totalSchedule = action.payload.totalCount;
      state.readLoading = false;
      state.error = "";
    }),
      builder.addCase(getSchedules.pending, (state, action) => {
        state.readLoading = true;
      }),
      builder.addCase(getSchedules.rejected, (state, action) => {
        console.log("rejected ", action);
        state.readLoading = false;
        state.error = "Server error";
      });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createSchedule.fulfilled, (state, action) => {
      // Add user to the state array

      // state.schedules = action.payload.data
      // state.totalSchedule = action.payload.totalCount;
      state.createLoading = false;
      state.currentPage = 1;
    }),
      builder.addCase(createSchedule.pending, (state, action) => {
        state.createLoading = true;
      }),
      builder.addCase(createSchedule.rejected, (state, action) => {
        console.log("rejected ", action);
        state.createLoading = false;
      });

    builder.addCase(updateSchedule.fulfilled, (state, action) => {
      // Add user to the state array
      state.updateLoading = false;
      state.currentPage = 1;
    }),
      builder.addCase(updateSchedule.pending, (state, action) => {
        state.updateLoading = true;
      }),
      builder.addCase(updateSchedule.rejected, (state, action) => {
        console.log("rejected ", action);
        state.updateLoading = false;
      });

    builder.addCase(deleteSchedule.fulfilled, (state, action) => {
      // Add user to the state array

      // state.schedules = action.payload.data
      // state.totalSchedule = action.payload.totalCount;
      state.currentPage = 1;
    }),
      builder.addCase(deleteSchedule.pending, (state, action) => {}),
      builder.addCase(deleteSchedule.rejected, (state, action) => {
        console.log("rejected ", action);
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetState,
  setSchedules,
  setCurrentPage,
  setEditId,
  setShowForm,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
