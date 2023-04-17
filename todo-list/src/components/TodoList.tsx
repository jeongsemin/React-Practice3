import { TodoType } from "../Todo/todoReducer";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: TodoType[];
  onToggleClick: (id: number) => void;
  onRemoveClick: (id: number) => void;
}
const TodoList = (props: TodoListProps) => {
  const arr = ["React", "Typescript", "Javascript", "CSS", "HTML"];
  return (
    <section>
      <ol className={styles.olConatiner}>
        {props.todos.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              text={todo.text}
              isChecked={todo.ischecked}
              id={todo.id}
              onRemoveClick={props.onRemoveClick}
              onToggleClick={props.onToggleClick}
            />
          );
        })}
      </ol>
    </section>
  );
};

export default TodoList;
