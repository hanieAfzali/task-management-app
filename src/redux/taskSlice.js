import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("http://46.100.46.149:8069/api/tasks");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }
  const data = await response.json();
  console.log(data, "sdfsdfsdfds");
  return data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default taskSlice.reducer;
