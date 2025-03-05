import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// list
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("http://46.100.46.149:8069/api/tasks");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }
  const data = await response.json();
  return data;
});

// add
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {    
    try {
      const response = await fetch("http://46.100.46.149:8069/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }     
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// edit
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit task");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return id; // فقط id رو برگشت می‌دهیم که از لیست حذف کنیم
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// complete
export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle task completion");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get list
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // add
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";     
        console.log(action.payload, 'action payload');
        state.tasks.results = state.tasks.results ? [...state.tasks.results, action.payload] : [action.payload];
        // state.tasks.results.push(action.payload);
        // state.tasks = [...state.tasks , action.payload]
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // edit
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.results.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks.results[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // delete
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.results = state.tasks.results.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // complete
      .addCase(toggleTaskCompletion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.results.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleTaskCompletion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
