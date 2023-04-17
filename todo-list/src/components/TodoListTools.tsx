import styles from "./TodoListTools.module.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgRadioCheck } from "react-icons/cg";

interface TodoListToolsProps {
  isAllChecked: boolean;
  onToggleAllClick: () => void;
  onRemoveAllClick: () => void;
}

const TodoListTools = (props: TodoListToolsProps) => {
  const handleToggleAllClick = () => {
    props.onToggleAllClick();
  };

  const handleRemoveAllClick = () => {
    props.onRemoveAllClick();
  };
  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleToggleAllClick}>
        {props.isAllChecked ? (
          <>
            <CgRadioCheck className={styles.checkAll} />
            전체 해제
          </>
        ) : (
          <>
            <IoCheckmarkDoneCircleOutline className={styles.checkAll} />
            전체 완료
          </>
        )}
      </button>
      <button
        className={[styles.button, styles.removeAllButton].join(" ")}
        onClick={handleRemoveAllClick}
      >
        <MdDelete className={styles.removeAll} />
        전체 삭제
      </button>
    </section>
  );
};

export default TodoListTools;
