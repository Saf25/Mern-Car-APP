import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//--------------get Scheduled Date List
export const getEntries = createAsyncThunk(
  "/entries/getEntries",
  async (entryInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/entries", {
        headers: { token: localStorage.getItem("token") },
      });
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

//------------addd New Date
export const addNewEntry = createAsyncThunk(
  "/entries/addNewEntry",

  async (entryInfo, { rejectWithValue, dispatch }) => {
    try {
      await axios.post("/entries/newentry", entryInfo, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getEntries());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

const entrySlice = createSlice({
  name: "entry",
  initialState: {
    entryList: {},
    loading: false,
    errors: null,
  },
  extraReducers: {
    [addNewEntry.pending]: (state) => {
      state.loading = true;
    },
    [addNewEntry.fulfilled]: (state, action) => {
      state.loading = false;
      state.entryList = action.payload;
      state.errors = null;
    },
    [addNewEntry.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    //-------------------------------
    [getEntries.pending]: (state) => {
      state.loading = true;
    },
    [getEntries.fulfilled]: (state, action) => {
      state.loading = false;
      state.entryList = action.payload;
      state.errors = null;
    },
    [getEntries.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default entrySlice.reducer;
