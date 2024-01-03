import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import userDataReducer from "./userDataSlice";
import desktopSettingsTabControlReducer from "./desktopSettingsTabControlSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    desktopSettingsTabControl: desktopSettingsTabControlReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
