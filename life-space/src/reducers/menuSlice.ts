import { createSlice } from "@reduxjs/toolkit";
interface iMenuSlice {
	isCollapsed: boolean;
}
const initialState: iMenuSlice = {
	isCollapsed: false,
};

export const menuSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isCollapsed = !state.isCollapsed;
		},
		openMenu: (state) => {
			state.isCollapsed = false;
		},
		closeMenu: (state) => {
			state.isCollapsed = true;
		},
	},
});

export const { toggleMenu, openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
