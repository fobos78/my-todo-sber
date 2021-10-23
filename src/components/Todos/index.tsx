import React from 'react';
import './Todos.css';

function Todos({myTodos, setMyTodos}: any) {

    function doneTodo(id: number) {
        setMyTodos((prev: any) => prev.map((el: any) => {
            if (el.id === id) {
                el.done = false;
                return el;
            } else {
                return el;
            }
        }));
    }

    function notDoneTodo(id: number) {
        setMyTodos((prev: any) => prev.map((el: any) => {
            if (el.id === id) {
                el.done = true;
                return el;
            } else {
                return el;
            }
        }));
    }

    function delTodo(id: number) {
        setMyTodos((prev: any) => prev.filter((el: any) => {
            return id !== el.id;
        }));
    }
    function checkBox(id:number, done: boolean){
        done ? doneTodo(id) : notDoneTodo(id);
    }

    return (
        <div className="Todos">
            {myTodos.map((todo: any) =>
                <div key={todo.id} className="Todo">
                    <div>
                        <div style={{textDecoration: todo.done ? "line-through" : "none"}}>{todo.title}</div>
                    </div>
                    <div className="Btn">
                        <input type="checkbox" checked={todo.done} onChange={() => checkBox(todo.id, todo.done)} />
                        <button type="button" onClick={() => delTodo(todo.id)}>Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todos;
