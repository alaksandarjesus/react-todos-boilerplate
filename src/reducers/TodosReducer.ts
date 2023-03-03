import {createSlice} from "@reduxjs/toolkit"

 const todoSlice:any = createSlice({
    name:"todo",
    initialState: {value: {
        count: 0
    }},
    reducers:{
        update: (state,action)=>{
            state.value={count:action.payload.count}
        }
    }


});

export const {update} = todoSlice.actions;
export default todoSlice.reducer;