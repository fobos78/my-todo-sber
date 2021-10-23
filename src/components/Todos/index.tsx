import React from 'react';

import './Todos.css';
import {Todo} from "../../types/Todo";

interface ITodos{
    myTodos: Todo[],
    setMyTodos: (myTodos: (prev: Todo[]) => Todo[]) => void;
}

function Todos({myTodos, setMyTodos}: ITodos) {

    function checkBox(id: number, done: boolean) {
        done ? doneTodo(id) : notDoneTodo(id);
    }

    function doneTodo(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.done = false;
                return el;
            } else {
                return el;
            }
        }));
    }

    function notDoneTodo(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.done = true;
                return el;
            } else {
                return el;
            }
        }));
    }

    function delTodo(id: number) {
        setMyTodos((prev: Todo[]) => prev.filter((el: Todo) => {
            return id !== el.id;
        }));
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
            {myTodos.map(todo =>
                <div key={todo.id} className="WrapTodo">
                    <div className="Action"
                         style={{backgroundColor: todo.select ? "lightgreen" : "white"}}
                         onClick={() => checkSelect(todo.id, todo.select)}
                    >

                    </div>
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
