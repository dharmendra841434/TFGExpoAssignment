import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
interface AppState {
  test: boolean; // Adjust this based on the expected structure
  singleMatchData: Object;
  allScheduledMatches: Array<any>;
}

// Initial state with type
const initialState: AppState = {
  test: false,
  singleMatchData: {},
  allScheduledMatches: [],
};

// Map slice with fetching location state
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<boolean>) => {
      state.test = action.payload;
    },
    setSingleMatchData: (state, action: PayloadAction<Object>) => {
      state.singleMatchData = action.payload;
    },
    setAllScheduledMatches: (state, action: PayloadAction<any>) => {
      state.allScheduledMatches = action.payload;
    },
  },
});

export const { setTest, setSingleMatchData, setAllScheduledMatches } =
  appSlice.actions;

export default appSlice.reducer;
