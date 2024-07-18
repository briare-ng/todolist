import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      //Ajoute la tâche au tableau state
      state.value.push(action.payload);
    },
    // rappel task = { task: inputText, urgent: urgent, complete: false };
    updateTask: (state, action) => {
      //on réécris le tableau d'objet en testant chaque éléments
      state.value = state.value.map((task) => {
        if (task.taskNumber == action.payload.taskNumber) {
          //on change la propriété avant de retourner l'objet
          return { ...task, complete: !task.complete };
        } else {
          return task;
        }
      });
    },
    // reconstruit le tableau du State et sans l'objet qui répond false à la condition
    deleteTask: (state, action) => {
      state.value = state.value.filter(
        (task) => task.taskNumber !== action.payload.taskNumber
      );
      console.log(state.value);
    },
  },
});
export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
