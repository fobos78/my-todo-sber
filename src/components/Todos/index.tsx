import React from 'react';

import './Todos.css';
import {Todo} from "../../types/Todo";
import {deleteTodo, updateTodo} from "../../request";

interface ITodos {
    myTodos: Todo[],
    setMyTodos: (myTodos: (prev: Todo[]) => Todo[]) => void,
    setLoadTodo: (loadTodo: (prev: boolean) => boolean) => void,
}

function Todos({myTodos, setMyTodos, setLoadTodo}: ITodos) {

    async function checkBox(id: number, done: boolean) {
        if (done) {
            return;
        }
        await updateTodo(id + '');
        setLoadTodo(prev => true);
    }


    async function delTodo(id: number) {
        await deleteTodo(id + '');
        setLoadTodo(prev => true);
    }

    function checkSelect(id: number, select: boolean) {
        select ? doneSelect(id) : notDoneSelect(id);
    }

    function doneSelect(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.select = false;
                return el;
            } else {
                return el;
            }
        }));
    }

    function notDoneSelect(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.select = true;
                return el;
            } else {
                return el;
            }
        }));
    }


    return (
        <div className="Todos">
            {myTodos && myTodos.map(todo =>
                <div key={todo.id} className="WrapTodo">
                    <div className="Action"
                         style={{backgroundColor: todo.select ? "lightgreen" : "white"}}
                         onClick={() => checkSelect(todo.id, todo.select)}
                    />
                    <div className="Todo">
                        <div>
                            <div style={{textDecoration: todo.done ? "line-through" : "none"}}>{todo.title}</div>
                        </div>
                        <div className="Btn">
                            <input type="checkbox" checked={todo.done} onChange={() => checkBox(todo.id, todo.done)}/>
                            <button type="button" onClick={() => delTodo(todo.id)}>Удалить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todos;
