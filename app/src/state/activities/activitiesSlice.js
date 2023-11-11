import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activitiesService } from "../../services/firestore";
import moment from "moment";

// interface ActivitiesSlice {
//   activities
// }

const initialState = {
  activities: [],
  loading: true,
  range: undefined
}

const calculateRange = (activities) => {
  const moments = activities
  .filter(a => a.start && a.duration > 0)
  .map(a => [moment(a.start), moment(a.start).add({hours: a.duration})])
  .reduce((acc, curr) => acc.concat(curr), []);

  return {
    start: moment.min(moments).toISOString(), 
    end: moment.max(moments).toISOString()
  };
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
          state.range = calculateRange(state.activities);
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
            state.range = calculateRange(state.activities);
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
    await activitiesService.updateActivity(activity);
    return activity;
  }
);

export const selectActivities = (state) => state.activities;
export const activitiesReducer = activitiesSlice.reducer;