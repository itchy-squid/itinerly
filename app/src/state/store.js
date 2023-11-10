import { activitiesReducer } from "./activities";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
  },
});

//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;