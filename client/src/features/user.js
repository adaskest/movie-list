import {createSlice} from "@reduxjs/toolkit";export const userSlice = createSlice({    name: 'user',    initialState: {        value: {            user: '',            notifications: []        }    },    reducers: {        userIn: ({value}, {payload}) => {            value.user = payload        },        addNotif: ({value}, {payload}) => {            value.notifications = payload        }    }})export const {userIn, addNotif} = userSlice.actionsexport default userSlice.reducer