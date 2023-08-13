import { useState } from 'react';
import './style.css';

function Todo() {
    var [newItem, setNewItem] = useState("");
    var [item, setItem] = useState([]);
    var [id, setId] = useState(1);
    var [msg, setMsg] = useState("");
    var [editingItemId, setEditingItemId] = useState();

    function addItem() {
        if (newItem.trim().length === 0) {
            setMsg("Please give a valid input");
            return;
        } else {
            setMsg("");
        }

        if (editingItemId > 0 ) {
            var updatedItems = item.map((item) => {
                if (item.id === editingItemId) {
                    return {
                        ...item,
                        value: newItem
                    };
                }
                return item;
            });
            setItem(updatedItems);
            setEditingItemId();
        } else {
            var todo = {
                id: id,
                value: newItem,
                completed: false,
            };
            setId((prevId) => prevId + 1);
            setItem((oldlist) => [...oldlist, todo]);
        }
        setNewItem("");
    }

    function deleteItem(id) {
        var newTodo = item.filter((todo) => todo.id !== id);
        setItem(newTodo);
    }

    function deleteAll() {
        setItem([]);
    }

    function strikeItem(todoId) {
        var updatedItem = item.map((item) => {
            if (item.id === todoId) {
                return {
                    ...item,
                    completed: !item.completed,
                };
            }
            return item;
        });
        setItem(updatedItem);
    }

    function editItem(todoId) {
        var editedItem = item.map((item) => {
            if (item.id === todoId) {
                setEditingItemId(todoId);
                setNewItem(item.value);
            }
            return item;
        });
        setItem(editedItem);
    }

    return (
        <div className='todo'>
            <h1>Todo App</h1>
            <div className='row'>
                <div className='col-1 v-center'>
                    <input
                        className='text-field'
                        type='text'
                        placeholder='Add your new todo'
                        value={newItem}
                        onChange={(event) => setNewItem(event.target.value)}
                    />
                </div>
                <div className='col-auto v-center'>
                    <button className='add-btn' type='button' onClick={() => addItem()}>&#43;</button>
                </div>
            </div>
            <div className='error mb-15'>{msg}</div>
            {item.map((todo) => {
                return (
                    <div key={todo.id} className='row placement'>
                        <div className='col-w30 vh-center'>
                            <input
                                className='checkbox'
                                type='checkbox'
                                onChange={() => strikeItem(todo.id)}
                                checked={todo.completed}
                            />
                        </div>
                        <div className='col-1'>
                            <div className={`tasks ${todo.completed ? 'strikethrough' : ''}`}>
                                {todo.value}
                            </div>
                        </div>
                        <div className='col-w30 h-right'>
                            <button
                                className='edit-btn'
                                type='button'
                                onClick={() => editItem(todo.id)}>
                                <i className='fa-solid fa-pen-to-square'></i>
                            </button>
                        </div>
                        <div className='col-w30 h-right'>
                            <button
                                className='delete-btn'
                                type='button'
                                onClick={() => deleteItem(todo.id)}>
                                <i className='fa-solid fa-trash'></i>
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className='row mt-30'>
                <div className='col-1'>
                    <div>You have <span>{item.length}</span> total tasks</div>
                </div>
                <div className='col-auto'>
                    <button className='clear-btn' type='button' onClick={() => deleteAll()}>
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todo;