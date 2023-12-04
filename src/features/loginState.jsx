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
            if (action.payload.username == 'admin' && action.payload.password == 'admin') {
                state.loggedIn = true
                state.username = action.payload.username
                state.password = action.payload.password
                console.log('login successful');
                console.log('login state', state.loggedIn);
            } else {
                console.log('login failed');
            }
        },
        logout: (state) => {
        state.loggedIn = false
        state.username = ''
        state.password = ''
        },
    },
    })

    export const {login, logout} = loginStateSlice.actions

    export default loginStateSlice.reducer