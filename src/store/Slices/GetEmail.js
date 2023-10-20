import { createSlice } from "@reduxjs/toolkit";
const getEmail = createSlice({
  name: "getEmailetAbout",
  initialState: {
    email: localStorage.getItem("email"),
    id: localStorage.getItem("id"),
    shearchBar: false,
    OpenTheModel: false,
    AddFriend: false,
    userId: localStorage.getItem("id"),
    uploding: false,
  },
  reducers: {
    handelChangeId(state, action) {
      state.id = action.payload;
    },
    handelChangeEmail(state, action) {
      state.email = action.payload;
    },
    handelChnageShearchBar(state, action) {
      state.shearchBar = action.payload;
    },
    handelOpenTheModel(state, action) {
      state.OpenTheModel = action.payload;
    },
    handelAddFreind(state, action) {
      state.AddFriend = action.payload;
    },
    handelChnageIdUser(state, action) {
      state.userEmail = action.payload;
    },
    handelChnageUploding(state, action) {
      state.uploding = action.payload;
    },
  },
});
export const {
  handelChangeEmail,
  handelChangeId,
  handelChnageShearchBar,
  handelOpenTheModel,
  handelAddFreind,
  handelChnageIdUser,
  handelChnageUploding,
} = getEmail.actions;

export default getEmail.reducer;
