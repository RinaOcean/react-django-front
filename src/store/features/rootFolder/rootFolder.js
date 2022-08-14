import { createSlice } from "@reduxjs/toolkit";

export const rootFolderSlice = createSlice({
    name: "rootFolder",
    reducers: {
        setRootFolderData: (state, action) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setRootFolderData } = rootFolderSlice.actions;

export default rootFolderSlice.reducer;
