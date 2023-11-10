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
  }
});

export const fetchAsync = createAsyncThunk(
  "activities/fetchAsync",
  async (projectId) => {
    var result = await activitiesService.fetchActivities(projectId);

    return result.map(r => 
      { 
        return {
          id: r.id,
          name: r.name,
          description: r.description,
          start: r.start?.toISOString(),
          duration: r.duration
        }
      });
  }
);

export const selectActivities = (state) => state.activities.activities;
export const activitiesReducer = activitiesSlice.reducer;