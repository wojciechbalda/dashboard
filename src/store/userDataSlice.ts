import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  username: string;
  location: string;
  locationId: number;
  backgroundImage: string;
}

const initialState: initialStateType = {
  username: "",
  location: "",
  locationId: 0,
  backgroundImage: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setLocationId: (state, action: PayloadAction<number>) => {
      state.locationId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      state.backgroundImage = action.payload;
    },
  },
});

export const { setLocation, setUsername, setBackgroundImage, setLocationId } =
  userDataSlice.actions;

export default userDataSlice.reducer;
