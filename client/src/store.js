import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postsReducer from "./slices/postSlice";
import entryReducer from "./slices/calendarSlice";

//reducer below 3ibara combineReducers fi westha plusieurs reducers

export default configureStore({
  reducer: { user: userReducer, posts: postsReducer, entry: entryReducer },
});
