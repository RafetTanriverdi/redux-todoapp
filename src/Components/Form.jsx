import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../Redux/todos/todosSlice'
import { nanoid } from '@reduxjs/toolkit'





function Form() {
    const [title, settitle] = useState("")
    const dispatch=useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo({id:nanoid(),title:title,completed:false}))
        settitle("")
    }

    return (
        <form onSubmit={handleSubmit} >
            <input className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => settitle(e.target.value)} />
        </form>
    )
}

export default Form