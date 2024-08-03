import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		addUserFavMovie: (state, action) => {
			if (!state.user.favMovies.includes(action.payload)) {
				state.user.favMovies.push(action.payload)
			}
		},
		removeUserFavMovie: (state, action) => {
			state.user.favMovies = state.user.favMovies.filter((movieId) => movieId._id !== action.payload)
		},
		logout: (state) => {
			state.user = null
		}
	}
})

export const { setUser, logout,  addUserFavMovie, removeUserFavMovie } = userSlice.actions

export default userSlice.reducer
