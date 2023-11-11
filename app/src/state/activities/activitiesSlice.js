import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activitiesService } from "../../services/firestore";

// interface ActivitiesSlice {
//   activities
// }

const initialState = {
  activities: [],
  loading: true
}

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAsync.pending, 
        (state) => { state.loading = true })
      .addCase(
        fetchAsync.fulfilled, 
        (state, action) => {
          state.activities = action.payload;
          state.loading = false;
        })
      .addCase(
        updateActivityAsync.fulfilled,
        (state, action) => {      
          const indexToUpdate = state.activities
            .findIndex(item => item.id === action.payload.id);
    
          // Check if the item exists
          if (indexToUpdate !== -1) {
            state.activities[indexToUpdate] = {...action.payload};
          }
        }
      )
  }
});

export const fetchAsync = createAsyncThunk(
  "activities/fetchAsync",
  async (projectId) => {
    var result = await activitiesService.fetchActivities(projectId);

    return result;
  }
);

export const updateActivityAsync = createAsyncThunk(
  "activities/updateActivityAsync",
  async (activity) => {
    // await activitiesService.updateActivity(activity);
    return activity;
  }
);

export const selectActivities = (state) => state.activities.activities;
export const activitiesReducer = activitiesSlice.reducer;