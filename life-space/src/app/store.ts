import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../reducers/userSlice";
import menuReducer from "./../reducers/menuSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		menu: menuReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
