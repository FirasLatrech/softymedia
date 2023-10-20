import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "getUser/fetchUserData",
  async () => {
    try {
      const response = await axios.get(
        `https://softymedia.onrender.com/api/users?populate=deep,4`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Fetch error:", error);
      throw error;
    }
  }
);

export const updateUserData = createAsyncThunk(
  "getUser/updateUserData",
  async ({ id, username, email, picture }) => {
    try {
      const response = await axios.put(
        `https://softymedia.onrender.com/api/users/${id}`,
        {
          username: username,
          email: email,
          Picture: picture,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Update error:", error);
      throw error;
    }
  }
);
export const updateFriends = createAsyncThunk(
  "getUser/updateFriends",
  async (data) => {
    const followers = data.current_follower;
    const id = data.CurentIdUser;

    try {
      const response = await axios.put(
        `https://softymedia.onrender.com/api/users/${id}`,
        {
          followers: followers,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Update error:", error);
      throw error;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
};

const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateFriends.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFriends.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateFriends.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default getUserSlice.reducer;
