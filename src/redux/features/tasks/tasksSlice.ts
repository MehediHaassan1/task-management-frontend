import { ITask } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface TasksState {
  tasks : ITask[],
  temporaryDeletedTasks: { [key: string]: ITask };
}

const initialState: TasksState = {
  tasks: [],
  temporaryDeletedTasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    temporarilyDeleteTask: (state, action) => {
      const taskId = action.payload.taskId; 
      const taskToDelete = state.tasks.find(task => task._id === taskId);
      if (taskToDelete) {
        state.temporaryDeletedTasks[taskId] = taskToDelete;
        state.tasks = state.tasks.filter(task => task._id !== taskId);
      }
    },
    restoreTask: (state, action) => {
      const taskId = action.payload.taskId;
      const restoredTask = state.temporaryDeletedTasks[taskId];
      if (restoredTask) {
        state.tasks.push(restoredTask);
        delete state.temporaryDeletedTasks[taskId];
      }
    },
  }
});

export const { temporarilyDeleteTask, restoreTask } = tasksSlice.actions;

export default tasksSlice.reducer;
