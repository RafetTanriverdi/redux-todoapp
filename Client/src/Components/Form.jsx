import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../Redux/todos/todosSlice'





function Form() {
    const [title, settitle] = useState("")
    const dispatch=useDispatch();
    const handleSubmit = (e) => {
        if(!title)return;
        e.preventDefault();
        dispatch(addTodo({title}))
        settitle("")
    }

    return (
        <form onSubmit={handleSubmit} >
            <input className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => settitle(e.target.value)} />
        </form>
    )
}

export default Form