import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//a7sen haja tsami esm slice houa bidou esm l action
//register a new user
export const register = createAsyncThunk(
  "users/register",
  async (userInput, { rejectWithValue }) => {
    try {
      //destructuring lel data elli mawjouda fel response
      //au lieu d ecrire response.data
      //ne5ou l path elli mawjoud fel register fel back api/user/register
      //elli mawjoud fel controller
      //hedhi hia rabta bin front wel back
      //je vais contacter le serveur 3al path below
      //lpost request 3andha body teb3etha mouch kima get
      //welli houa userInput
      //data hia response ta3 serveur

      const { data } = await axios.post("/api/user/register", userInput);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);
//login the user and check if he exist on DB
//data houni jeya mel back w feha token
export const login = createAsyncThunk(
  "users/login",
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/login", userInput);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//load User Informations
export const loadUser = createAsyncThunk(
  "users/loadUser",
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/loaduser", {
        headers: { token: localStorage.getItem("token") },
        //pr savoir si token expiré ou pa il faut l envoyer lel back
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    isAuth: Boolean(localStorage.getItem("isAuth")) || false,
    loading: false,
    token: localStorage.getItem("token") || null,
    errors: null,
  },
  //psk ma3anech logout fel back donc tji front khw bel reducers
  //--------------------------------------------------------
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.token = null;
      state.userInfo = {};
    },
  },
  //------------------------------------------------------
  /*! register Handler----------------------------------*/
  //extraReducers houma elli yet3amlou front wback
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    //lpayload elli jeya feha response ta3 lback
    //newPerson houma les donnés elli t9aydou fel back ema eni
    //7achti juste bel token
    // res.json({ msg: "User created: ", newPerson, token })

    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
      state.isAuth = true;
      state.errors = null;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    //---------------------------------------------------------
    //! Login Handler------------------------------------------
    //login pending optional if icon of chargement
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    //-----------------------------------------------------
    /*Load User Info Handler--------------------------------------*/
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.errors = null;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
