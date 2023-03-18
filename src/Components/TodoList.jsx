import React from 'react'
import  {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { toggle,destroy } from '../Redux/todos/todosSlice';

function TodoList() {
    const items = useSelector(state=>state.todos.items);
    const dispatch= useDispatch();

    const handleDestroy =(id)=>{
      if(window.confirm("are you sure ?")){
        dispatch(destroy(id))

      }
    }

  return (
    <section className="main">
    <input className="toggle-all" type="checkbox" />
    <label htmlFor="toggle-all">
        Mark all as complete
    </label>

    <ul className="todo-list">
        
      {
        items.map((item)=>(
        <li key={item.id} className={item.completed ? "completed":"" }>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={()=>dispatch(toggle({id:item.id}))} checked={item.completed}/>
                <label> {item.title} </label>
                <button className="destroy" onClick={()=>handleDestroy(item.id)} ></button>
            </div>
        </li>

        ))
      }
    </ul>
</section>
  )
}

export default TodoList