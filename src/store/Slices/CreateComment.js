import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCommentAsync = createAsyncThunk(
  "comments/createComment",
  async ({ id, name, comment_description, picture }) => {
    try {
      const response = await axios.post(
        `https://softymedia.onrender.com/api/comments`,
        {
          data: {
            Name: name,
            post: id,
            comment_description: comment_description,
            picture: picture,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to create a comment.", error);
      throw error;
    }
  }
);

const createComment = createSlice({
  name: "createCommentet",
  initialState: {
    data: null,
    id: null,
  },
  reducers: {
    handelChangeId(state, action) {
      state.id = action.payload;
    },
    setCommentData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createCommentAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { handelChangeId, setCommentData } = createComment.actions;

export default createComment.reducer;
