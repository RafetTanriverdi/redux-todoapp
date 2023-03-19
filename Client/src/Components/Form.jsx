import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../Redux/todos/todosSlice'
import { useSelector } from 'react-redux'
import Error from './Error'
import Loading from './Loading'





function Form() {
    const [title, settitle] = useState('')
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.todos.addNewTodoLoading)
    const addNewTodoError = useSelector((state) => state.todos.addNewTodoError)

    const handleSubmit = async (e) => {
        if (!title) return;

        e.preventDefault();
        await dispatch(addTodoAsync({ title }));
        settitle('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }} >
            <input disabled={isLoading} className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => settitle(e.target.value)} />
            {
                isLoading && <Loading />
            }
            {
                addNewTodoError && <Error message={addNewTodoError} />
            }
        </form>
    )
}

export default Form