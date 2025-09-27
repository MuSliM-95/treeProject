import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'


export interface IInitialState {
  lang: 'ru' | 'en' | null
}

const initialState: IInitialState = {
   lang: null
}

const homeReducer = createSlice({
	name: 'home',
	initialState,
	reducers: {

		langToggle(state, action: PayloadAction<{ lang: 'ru' | 'en' }>) {
			state.lang = action.payload.lang
		},


	}
})

export const {
  langToggle
} = homeReducer.actions
export default homeReducer.reducer
