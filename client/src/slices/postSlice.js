import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//--------------get Post List
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  // posts/getAllPosts hedha 7ata ken samitou bel ghalet pas d erreurs
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/post/getposts", {
        headers: { token: localStorage.getItem("token") },
      });
      //posts raj3elna l back objet fih donnéés lkol
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

//------------addd Post
export const addNewPost = createAsyncThunk(
  "posts/addpost",
  //houni bech yraja3lek lista jdida au lieu l post eli zedtou
  //nesta3mlou dispatch like below
  async (postInfo, { rejectWithValue, dispatch }) => {
    try {
      //l'astuce bech ynajem ysajel les donnés fel back
      //lazem avec cahq post tab3athlou token wel key correspondants
      //hakek houa il te permet bech enregistri fel DB
      //chq post doit avoir token fourni
      //dima nhotou fel header ta3 rquest
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!tres imortant
      await axios.post("/api/post/newpost", postInfo, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getAllPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

//------------- delete Post by id
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/post/deletepost/${postId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getAllPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

//------------------update Post by Id
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postInfo, { rejectWithValue, dispatch }) => {
    //postInfo feha les infos ta3 lpost donc on uara besoin de l _id aprés
    try {
      await axios.put(`/api/post/updatepost/${postInfo.id}`, postInfo, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getAllPosts(), []);
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
    loading: false,
    errors: null,
  },
  extraReducers: {
    //-----------------------------------------------------
    /*Post List Handler--------------------------------------*/
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      //---houni el payload bechh tetafecta lel objet postList: {}
      state.postList = action.payload;
      state.errors = null;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    //--------------------------------------------
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.postList = action.payload;
      state.errors = null;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
  //manest7a9ouch Post handler 5ater manst7a9ou men 3andou chay
});

export default postsSlice.reducer;
///------hedha l objet ta3 lpayload houa elli fih les infos
