import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'


export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.data;
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return await res.data;
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return await id;
})


export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        item: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoLoading: false,
        addNewTodoError: null,
    },
    reducers: {

        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.item.find(item => item.id === id);
        //     item.completed = !item.completed
        // },
        // destroy: (state, action) => {
        //     const id = action.payload;
        //     const filtered = state.item.filter((item => item.id !== id));
        //     state.item = filtered;

        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearComplated: (state) => {
            const filtred = state.item.filter(item => item.completed === false);
            state.item = filtred
        }
    },
    extraReducers(builder) {
        builder
            //get todo
            .addCase(getTodosAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.item = action.payload;
                state.isLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            //add todo
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.item.push(action.payload);
                state.addNewTodoLoading = false;

            })
            .addCase(addTodoAsync.pending, (state) => {
                state.addNewTodoLoading = true;
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodoLoading = false;
                state.addNewTodoError = action.error.message;
            })

            //toggle 
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, completed } = action.payload;
                const index = state.item.findIndex(item => item.id === id);
                state.item[index].completed = completed;
            })
            //delete
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const id = action.payload;
                const filtered = state.item.filter((item => item.id !== id));
                state.item = filtered;

            })


    },
});

export const selectedTodos = state => state.todos.item
export const selectedFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.item;
    }
    return state.todos.item.filter((todo) =>
        state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true)
};

export const { addTodo, toggle, destroy, changeActiveFilter, clearComplated } = todosSlice.actions;
export default todosSlice.reducer;