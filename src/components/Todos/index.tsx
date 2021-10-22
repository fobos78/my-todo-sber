import React from 'react';
import './Todos.css';

function Todos({myTodos, setMyTodos}: any) {

    const [flag, setFlag] = React.useState(true);

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

    function delTodo(id: number) {
        setMyTodos((prev: any) => prev.filter((el: any) => {
            return id !== el.id;
        }));
    }

    return (
        <div className="Todos">
            {myTodos.map((todo: any) =>
                <div key={todo.id} className="Todo">
                    <div>
                        <div style={{textDecoration: todo.done ? "none" : "line-through"}}>{todo.title}</div>
                    </div>
                    <div className="Btn">
                        <button type="button" onClick={() => doneTodo(todo.id)}>Выполнено</button>
                        <button type="button" onClick={() => delTodo(todo.id)}>Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todos;
