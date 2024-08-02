import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	userFavMovies: []
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		setUserFavMovies: (state, action) => {
			state.userFavMovies = action.payload
		},
		logout: (state) => {
			state.user = null
			state.userFavMovies = []
		}
	}
})

export const { setUser, logout, setUserFavMovies } = userSlice.actions

export default userSlice.reducer
