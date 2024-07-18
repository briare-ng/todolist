import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Task.module.css";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../reducers/tasks";

function Task(props) {
  // const [complete, setComplete] = useState(false);

  const dispatch = useDispatch();

  const handleTrash = () => {
    dispatch(deleteTask(props));
  };
  const handleComplete = () => {
    dispatch(updateTask(props));
  };

  // style du texte de la task lorsqu'elle est déclarée terminée
  let textStyle;
  if (props.completed) {
    textStyle = { textDecoration: "line-through" };
  } else {
    textStyle = {};
  }

  return (
    <div className={styles.task}>
      <div className={styles.taskSection}>
        <input
          type="checkbox"
          className={styles.completeCheckbox}
          onChange={handleComplete}
          checked={props.completed}
        />
        <p className={styles.text} style={textStyle}>
          {props.text}
        </p>
        {props.urgent && <span className={styles.urgentBadge}>Urgent</span>}
        {props.completed && (
          <span className={styles.completed}>
            <FontAwesomeIcon icon={faCheck} />
            &nbsp;Done !
          </span>
        )}
      </div>
      <FontAwesomeIcon
        icon={faTrash}
        className={styles.delete}
        onClick={handleTrash}
      />
    </div>
  );
}

export default Task;
