import React from 'react'
import { useSelector } from 'react-redux'
import { changeActiveFilter,clearComplated } from '../Redux/todos/todosSlice';
import { useDispatch } from 'react-redux';

function ContentFooter() {
    const items = useSelector(state => state.todos.item);
    const itemsLeft = items.filter((item) => !item.completed).length;
    const activeFilter = useSelector(state => state.todos.activeFilter);
    const dispatch = useDispatch();

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{itemsLeft} </strong>
                {itemsLeft <= 1 ? "Item" : "Items"} Left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" className={activeFilter === 'all' ? 'selected' : ''} onClick={() => dispatch(changeActiveFilter('all'))}>All</a>
                </li>
                <li>
                    <a href="#/" className={activeFilter === 'active' ? 'selected' : ''} onClick={() =>dispatch(changeActiveFilter('active'))} >Active</a>
                </li>
                <li>
                    <a href="#/" className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => dispatch(changeActiveFilter('completed'))} >Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={()=>dispatch(clearComplated())}>
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter