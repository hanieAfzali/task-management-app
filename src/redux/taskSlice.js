import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 1. عملیات دریافت تسک‌ها از API
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("http://46.100.46.149:8069/api/tasks");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }
  const data = await response.json();
  return data;
});

// 2. عملیات اضافه کردن تسک
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    
    try {
      const response = await fetch("http://46.100.46.149:8069/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log(response,'response');
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      return await response.json();
    } catch (error) {
      console.log(error, 'errorrrrrr');
      
      return rejectWithValue(error.message);
    }
  }
);

// 3. عملیات ویرایش تسک
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ taskId, updatedTask }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit task");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. عملیات حذف تسک
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return taskId; // فقط taskId رو برگشت می‌دهیم که از لیست حذف کنیم
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 5. عملیات تغییر وضعیت تسک (کامل شده / کامل نشده)
export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async ({ taskId, completed }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://46.100.46.149:8069/api/tasks/${taskId}`,
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
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // دریافت تسک‌ها
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
      // اضافه کردن تسک
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";     
        state.tasks.results.push(action.payload);
        // state.tasks = [...state.tasks , action.payload]
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ویرایش تسک
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // حذف تسک
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state, 'payload delete');
        
        state.tasks.results = state.tasks.results.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // تغییر وضعیت تسک (کامل شده / کامل نشده)
      .addCase(toggleTaskCompletion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
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
