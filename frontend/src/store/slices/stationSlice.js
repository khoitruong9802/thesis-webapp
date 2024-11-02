import { createSlice } from '@reduxjs/toolkit'

export const stationSlice = createSlice({
  name: 'station',
  initialState: {
    value: [],
    selected: null
  },
  reducers: {
    setStation: (state, action) => {
      state.value = action.payload
    },
    setSelectedStation: (state, action) => {
      state.selected = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStation, setSelectedStation } = stationSlice.actions

export default stationSlice.reducer