import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = {
    loggedIn: false,
    username: '',
    password: '',
}

export const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: { value: initialStateValue
    },
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;
            if (username == 'admin' && password == 'admin') {
            console.log('login succeeded', action.payload.username, action.payload.password);
                return {
                ... state,
                loggedIn: true,
                username: action.payload.username,
                password: action.payload.password,
            }} else {
                console.log('login failed');
                return state
            }
        },
        logout: (state) => {
        console.log('logout succeeded');
        console.log('state:', state);
        return {
            ... state,
        loggedIn: false,
        username: '',
        password: ''
        }},
    },
    })

    export const {login, logout} = loginStateSlice.actions

    export default loginStateSlice.reducer
