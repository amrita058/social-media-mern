import {createSlice} from "@reduxjs/toolkit"

// CHECK IF USER LOGIN WITH CORRECT CREDENTIALS
const initialState ={value:false}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        showAuthenticate:(state)=>{
            state.value = state.value
        },
        authenticate:(state)=>{
            state.value = true
        },
        unauthenticate:(state)=>{
            state.value = false
        },
    }
})

//THEME FOR APP
const initialTheme = {dark:true}
export const themeSlice = createSlice({
    name:"theme",
    initialState:initialTheme,
    reducers:{
        changeTheme:(state)=>{
            state =  {...state,dark:!state.dark}
            return state
        }
    }
})

//DROPDOWN FOR APP
const initialDrop = {value:false}
export const dropSlice = createSlice({
    name:"drop",
    initialState:initialDrop,
    reducers:{
        changeDrop:(state,action)=>{
            state =  {...state,value:action.payload}
            return state
        }
    }
})

//LOGGED IN USER INFO
const initialUser = {_id:'',userName:'',email:'',fullName:'',url:''}
export const userInfoSlice = createSlice({
    name:"user",
    initialState:initialUser,
    reducers:{
        changeUser:(state,action)=>{
            // console.log("action here",action.payload)
            state =  {...state,...action.payload}
            // console.log("state here",state)
            return state
        }
    }
})

//CLICKED POST INFO
const initialPost = {userName:'',url:'',content:'',photo:'',date:''}
export const postInfoSlice = createSlice({
    name:"postData",
    initialState:initialPost,
    reducers:{
        clickedPost:(state,action)=>{
            console.log("action here",action.payload)
            state =  {...state,...action.payload}
            console.log("state here",state)
            return state
        }
    }
})

export const {showAuthenticate,authenticate,unauthenticate} = authSlice.actions
export const {changeTheme} = themeSlice.actions
export const {changeDrop} = dropSlice.actions
export const {changeUser} = userInfoSlice.actions
export const {clickedPost} = postInfoSlice.actions

export default {auth:authSlice.reducer,theme:themeSlice.reducer,drop:dropSlice.reducer,user:userInfoSlice.reducer,postInfo:postInfoSlice.reducer}
