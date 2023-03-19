import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, selectedFilteredTodos, getTodosAsync,toggleTodoAsync } from '../Redux/todos/todosSlice';
import Loading from './Loading';
import Error from './Error';

function TodoList() {

  const dispatch = useDispatch();
  const filtredTodos = useSelector(selectedFilteredTodos);
  const isLoading =useSelector(state=>state.todos.isLoading);
  const error = useSelector(state=>state.todos.error)
 
  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch]);

  const handleDestroy = async(id) => {
    if (window.confirm("are you sure ?")) {
     await dispatch(deleteTodoAsync(id))

    }
  }
  const handleToggle = async(id,completed)=>{
    await dispatch(toggleTodoAsync({id, data:{completed}}))  }

  if(isLoading){
  return <Loading/>
  }
  if (error){
    return <Error message={error} />
  }

  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <ul className="todo-list">

        {
          filtredTodos.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <div className="view">
                <input className="toggle" type="checkbox" onChange={() => handleToggle(item.id,!item.completed)} checked={item.completed} />
                <label> {item.title} </label>
                <button className="destroy" onClick={() => handleDestroy(item.id)} ></button>
              </div>
            </li>

          ))
        }
      </ul>
    </section>
  )
}

export default TodoList