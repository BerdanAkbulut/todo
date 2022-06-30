import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  todos: [],
  //todos: Cookies.get('todos') ? JSON.parse(Cookies.get('todos')) : [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (!Cookies.get('todos')) {
        state.todos.push(action.payload);
        Cookies.set('todos', JSON.stringify(state.todos));
        return;
      }
      let todos = JSON.parse(Cookies.get('todos'));
      state.todos = todos;
      state.todos.push(action.payload);
      Cookies.set('todos', JSON.stringify(state.todos));
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
