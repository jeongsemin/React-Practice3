import React, { useState, useReducer } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoListTools from "./components/TodoListTools";
import Divider from "./components/Divider";
import TodoList from "./components/TodoList";
import TodoListArea from "./components/TodoListArea";

import { todoReducer } from "./Todo/todoReducer";
import { todoInputReducer } from "./Todo/todoInputReducer";

function App() {
  // const [text, setText] = useState("");
  const [inputState, inputDispatch] = useReducer(todoInputReducer, {
    text: "",
  });
  const [todoState, todoDispatch] = useReducer(todoReducer, { todos: [] });
  // const [todos, setTodos] = useState<TodoType[]>([]);

  const handleTextChange = (text: string) => {
    inputDispatch({
      type: "change",
      payload: text,
    });
    // setText(text);
  };

  const handleSubmit = () => {
    // if (!text) {
    //   return;
    // }
    if (!inputState.text) {
      return;
    }
    todoDispatch({
      type: "add",
      payload: {
        text: inputState.text,
      },
    });
    // const newTodos = todos.concat({
    //   id: Date.now(),
    //   text: text,
    //   ischecked: false,
    // });

    // setTodos(newTodos);
    // setText("");
    inputDispatch({
      type: "clear",
    });
  };
  const handleRemove = (id: number) => {
    todoDispatch({
      type: "remove",
      payload: {
        id: id,
      },
    });

    // setTodos(newTodos);
  };

  const handleToggle = (id: number) => {
    todoDispatch({
      type: "checked",
      payload: {
        id: id,
      },
    });

    // setTodos(newTodos);
  };

  const isTodoAllChecked = () => {
    return todoState.todos.every((todo) => todo.ischecked);
  };

  const handleToggleAllClick = () => {
    const isAllChecked = isTodoAllChecked();
    todoDispatch({
      type: "allChecked",
      payload: isAllChecked,
    });

    // setTodos(newTodos);
  };
  const handleRemoveAllClick = () => {
    todoDispatch({
      type: "allRemove",
    });
  };

  return (
    <main className="App">
      <TodoHeader
        count={todoState.todos.filter((todo) => !todo.ischecked).length}
      />
      <TodoInput
        text={inputState.text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />
      <TodoListArea todoCount={todoState.todos.length}>
        <TodoListTools
          onRemoveAllClick={handleRemoveAllClick}
          onToggleAllClick={handleToggleAllClick}
          isAllChecked={isTodoAllChecked()}
        />
        <Divider />
        <TodoList
          todos={todoState.todos}
          onRemoveClick={handleRemove}
          onToggleClick={handleToggle}
        />
      </TodoListArea>
    </main>
  );
}

export default App;
