import { createSlice } from "@reduxjs/toolkit";


export const todosSlice = createSlice({
    name:"todos",
    initialState:{
        item:[
            {
                id:"1",
                title:"Learn React",
                completed: true,
            },{
                id:"2",
                title:"Read a book",
                completed: false,
            }
        ],
        activeFilter:'all',
    },
    reducers:{
     addTodo:(state,action)=>{
        state.item.push(action.payload);
     },
     toggle:(state,action)=>{
         const {id }= action.payload;
         const item = state.item.find(item=>item.id===id);
         item.completed=!item.completed
     },
     destroy:(state,action)=>{
        const id= action.payload;
        const filtered = state.item.filter((item=>item.id !==id));
        state.item =filtered;

     },
     changeActiveFilter:(state,action)=>{
        state.activeFilter=action.payload;
     },
     clearComplated:(state)=>{
        const filtred =state.item.filter(item=>item.completed===false);
        state.item=filtred
     }
    },
});

export const{addTodo,toggle,destroy,changeActiveFilter,clearComplated}= todosSlice.actions;
export default todosSlice.reducer;