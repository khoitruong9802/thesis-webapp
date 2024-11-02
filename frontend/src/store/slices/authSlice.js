import { createSlice } from '@reduxjs/toolkit'

const checkIsAuth = () => {
  return localStorage.getItem("refreshToken") ? true : false;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: checkIsAuth(),
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer