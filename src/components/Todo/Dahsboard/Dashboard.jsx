import { useState } from "react";
import { firestore } from "../../../firebase/firebase";
import { doc, setDoc, getDoc, query } from "firebase/firestore";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  sendEmailLink,
} from "../../../firebase/auth";
// import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [isEdit, setEdit] = useState({ status: false, key: null });
  const [editor, setEditor] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState({
    1: {
      task: "sleep",
    },
    2: {
      task: "code",
    },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task) return;
    const docRef = doc(firestore, "todos/task");
    setDoc(docRef, { ...todos, [Date.now()]: { task } });
    setTodos((todos) => ({ ...todos, [Date.now()]: { task } }));
    setTask("");
  };

  const handleDelete = (key) => {
    const newTodos = { ...todos };
    delete newTodos[key];
    setTodos(newTodos);
  };

  const handleEdit = (key) => {
    setEdit((e) => ({ status: !e.status, key }));
    if (isEdit.status && editor) {
      setTodos((todos) => ({ ...todos, [key]: { task: editor } }));
      setEditor("");
    } else {
      setEditor(todos[key].task);
    }
  };

  const handleRead = async () => {
    const q = query(doc(firestore, "try/catch"));
    const docSnapshot = await getDoc(q);
    if (docSnapshot.exists()) {
      console.log("yes");
      console.log(docSnapshot.id);
      const tasks = docSnapshot.data();
      setTodos(tasks);
    } else {
      console.log("no");
    }
  };

  return (
    <div>
      <h4>Read</h4>
      <br />
      <div>
        {Object.entries(todos).map((todo, idx) => (
          <div key={idx}>
            <div style={{ minWidth: "8em", display: "inline-block" }}>
              {idx + 1}
              {": "}
              {isEdit.status && isEdit.key === todo[0] ? (
                <input
                  onChange={(e) => setEditor(e.target.value)}
                  value={editor}
                  type="text"
                />
              ) : (
                todo[1].task
              )}
            </div>
            <button onClick={() => handleEdit(todo[0])}>
              {isEdit.status && isEdit.key === todo[0] ? "save" : "edit"}
            </button>{" "}
            <button onClick={() => handleDelete(todo[0])}>delete</button>
          </div>
        ))}
      </div>
      <hr />
      <form onSubmit={handleAdd}>
        <h4> Create </h4>
        <label htmlFor="task">
          Task:
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
            type="text"
          />
        </label>
        <button>Add</button>
      </form>
      <button onClick={handleRead}>Read Data</button>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        sign in with google
      </button>
      <button
        onClick={() => {
          logInWithEmailAndPassword();
        }}
      >
        sign in with email and password
      </button>
      <button
        onClick={() => {
          signUpWithEmailAndPassword();
        }}
      >
        sign up with email and password
      </button>
      <button
        onClick={() => {
          sendEmailLink();
        }}
      >
        send email link
      </button>
    </div>
  );
};

export default Dashboard;
