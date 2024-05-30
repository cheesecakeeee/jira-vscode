import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  projectModalOpen: boolean;
}
const initialState: StateType = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
export default projectListSlice.reducer;
