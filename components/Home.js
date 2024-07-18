import styles from "../styles/Home.module.css";
import { useState } from "react";
//composant
import Task from "./Task";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../reducers/tasks";

function Home() {
  const [inputText, setInputText] = useState(""); // contenu de la tâche
  const [urgent, setUrgent] = useState(false); // défini l'état d'urgence de la tâche
  const [msg, setMsg] = useState("");
  //dispatch vers reducer
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasks.value);

  const handleAddTask = () => {
    if (inputText !== "") {
      //envoyer le contenu de la tache et son état d'urgence au reducer
      const task = {
        task: inputText,
        urgent: urgent,
        complete: false,
        taskNumber: Date.now(),
      };
      dispatch(addTask(task));
      //efface les champs après validation
      setUrgent(false);
      setInputText("");
      setMsg("");
    } else {
      setMsg("** Please name the task **");
    }
  };

  //taskNumber pour garantir la sélection d'un composant qui pourrait avoir le même texte
  const tasksComponents = tasksList.map((data, i) => {
    return (
      <Task
        key={i}
        taskNumber={data.taskNumber}
        text={data.task}
        urgent={data.urgent}
        completed={data.complete}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.addContainer}>
          <input
            type="text"
            placeholder="Task"
            id="taskName"
            className={styles.addTask}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            value={inputText}
          />
          <div className={styles.urgentSection}>
            <input
              type="checkbox"
              id="urgent"
              className={styles.urgentCheckbox}
              onChange={(e) => {
                setUrgent(e.target.checked);
              }}
              checked={urgent}
            />
            <label htmlFor="urgent" className={styles.urgent}>
              URGENT
            </label>
          </div>
          <button id="add" className={styles.button} onClick={handleAddTask}>
            ADD TASK
          </button>
        </div>
        <div className={styles.errorMsg}>
          {msg !== "" && <span>{msg}</span>}
        </div>
        {/* Conteneur des taches */}
        <div className={styles.tasksContainer}>{tasksComponents}</div>
      </div>
    </div>
  );
}

export default Home;

//idée d'ajout de la gestion des dates style calendar permattant de gérer :
// - les dates d'ajout des tâches
// - les dates de complétion des tâches
// - les dates butoir des tâches
// organisser les tâches par ordres chronologique
