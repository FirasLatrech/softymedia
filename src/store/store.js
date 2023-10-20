import { configureStore } from "@reduxjs/toolkit";
import getUserReducer from "./Slices/GetUser";
import getEmailReducer from "./Slices/GetEmail";
import getPosteReducer from "./Slices/GetPost";
import getProfileReducer from "./Slices/getProfile";
import createCommentReducer from "./Slices/CreateComment"; // Added import for createCommentReducer

const store = configureStore({
  reducer: {
    getUser: getUserReducer,
    getEmail: getEmailReducer,
    getPoste: getPosteReducer,
    getProfil: getProfileReducer,
    createComment: createCommentReducer, // Added createCommentReducer to the store
  },
});

export default store;
