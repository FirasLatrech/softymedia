import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfileData = createAsyncThunk(
  "getProfil/fetchProfileData",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_BACKEND_APP}api/profiles?populate=*`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Fetch error:", error);
      throw error;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
};

const getProfil = createSlice({
  name: "getProfil",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default getProfil.reducer;
