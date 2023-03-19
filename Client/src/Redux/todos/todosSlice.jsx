import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";


export const getTodosAsync = createAsyncThunk('todo/getTodosAsync', async () => {
    const res = await fetch('http://localhost:7000/todos');
    return await res.json();
})
export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        item: [],
        isLoading: false,
        eror: null,
        activeFilter: 'all',
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.item.push(action.payload);
            },
            prepare: ({ title }) => {
                return {
                    payload: {
                        id: nanoid(),
                        completed: false,
                        title,
                    }
                }
            },
        },
        toggle: (state, action) => {
            const { id } = action.payload;
            const item = state.item.find(item => item.id === id);
            item.completed = !item.completed
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.item.filter((item => item.id !== id));
            state.item = filtered;

        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearComplated: (state) => {
            const filtred = state.item.filter(item => item.completed === false);
            state.item = filtred
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.item = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.eror = action.eror.massage;
        }

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