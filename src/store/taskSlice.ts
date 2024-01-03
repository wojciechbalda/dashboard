import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface TaskState {
  tasks: { id: string; task: string }[];
  editedTask: string;
}

const initialState: TaskState = {
  tasks: [],
  editedTask: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const id = uuidv4();
      state.tasks.push({ task: action.payload, id });
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = newTasks;
    },
    startEditing: (state, action: PayloadAction<string>) => {
      state.editedTask = action.payload;
    },
    saveChanges: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === state.editedTask,
      );
      state.tasks[index].task = action.payload;
      state.editedTask = "";
    },
    stopEditing: (state) => {
      state.editedTask = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask, startEditing, saveChanges, stopEditing } =
  taskSlice.actions;

export default taskSlice.reducer;
