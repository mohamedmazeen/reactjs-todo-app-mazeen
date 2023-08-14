/**
 * 
 * index.js
 * @author - Mazeen
 * @date - 14/8/2023
 **/
import { useState } from 'react';
import Add from '../../components/button/add';
import Delete from '../../components/button/delete';
import './style.css';

function Todo() {
    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState([]);
    const [id, setId] = useState(1);
    const [msg, setMsg] = useState("");
    const [editingItemId, setEditingItemId] = useState();

    function addItem() {
        if (newItem.trim().length === 0) {
            setMsg("Please give a valid input");
            return;
        } else {
            setMsg("");
        }

        if (editingItemId > 0 ) {
            var updatedItems = items.map((item) => {
                if (item.id === editingItemId) {
                    return {
                        ...item,
                        value: newItem
                    };
                }
                return item;
            });
            setItems(updatedItems);
            setEditingItemId();
        } else {
            var todo = {
                id,
                value: newItem,
                completed: false,
            };
            setId((prevId) => prevId + 1);
            setItems((oldlist) => [...oldlist, todo]);
        }
        setNewItem("");
    }

    function deleteItem(id) {
        var newTodo = items.filter((todo) => todo.id !== id);
        setItems(newTodo);
    }

    function deleteAll() {
        setItems([]);
    }

    function strikeItem(todoId) {
        var updatedItem = items.map((item) => {
            if (item.id === todoId) {
                return {
                    ...item,
                    completed: !item.completed,
                };
            }
            return item;
        });
        setItems(updatedItem);
    }

    function editItem(todoId) {
        var editedItem = items.map((item) => {
            if (item.id === todoId) {
                setEditingItemId(todoId);
                setNewItem(item.value);
            }
            return item;
        });
        setItems(editedItem);
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
                    <Add clickHandler={addItem}/>
                </div>
            </div>
            <div className='error mb-15'>{msg}</div>
            {items.map((todo) => 

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
                           <Delete clickHandler={() => deleteItem(todo.id)} />
                        </div>
                    </div>
                
            )}

            <div className='row mt-30'>
                <div className='col-1'>
                    <div>You have <span>{items.length}</span> total tasks</div>
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