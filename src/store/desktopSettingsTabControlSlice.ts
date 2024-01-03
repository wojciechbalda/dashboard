import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  isOpen: boolean;
}

const initialState: initialStateType = {
  isOpen: false,
};

const desktopSettingsTabControlSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = desktopSettingsTabControlSlice.actions;

export default desktopSettingsTabControlSlice.reducer;
