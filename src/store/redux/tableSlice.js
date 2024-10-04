import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: ''
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers:{
    changeData: (state, action) =>{
      state.option = action.payload;
    }
  }
});

export const { changeData } = tableSlice.actions;
export default tableSlice.reducer;