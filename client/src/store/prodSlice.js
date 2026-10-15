import {createSlice} from '@reduxjs/toolkit'

const prodSlice = createSlice({
    name: 'prod',
    initialState:{
        link: 'http://localhost:8000'
    }
})

export default prodSlice.reducer