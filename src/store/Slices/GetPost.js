import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostData = createAsyncThunk(
  "getPoste/fetchPostData",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/posts?populate=*`,
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

export const createNewPost = createAsyncThunk(
  "getPoste/createNewPost",
  async (postData) => {
    console.log(postData);
    try {
      const response = await axios.post(
        `http://localhost:1337/api/posts`,
        {
          data: {
            profile: postData.id,
            Picture: postData.imageUrl,
            description: postData.text,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Failed to create a post.", error);
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, like }) => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/posts/${id}`,
        {
          data: {
            like: like,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        console.error("Failed to update the post.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
};

const getPoste = createSlice({
  name: "getPoste",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPostData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // Handle state update for the updated post if needed
      });
  },
});

export default getPoste.reducer;
