import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TodoList from "../todoList/TodoList";
import scss from "./Todo.module.scss";

interface Todo {
  _id: number;
  password: string;
  text: string;
  img: string;
}
const url = import.meta.env.VITE_BACKEND_ULR;

const Todo = () => {
  const notify = () => toast.success("success");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [values, setValues] = useState({
    text: "",
    img: "",
    password: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const postRequest = async () => {
    if (values.text === "" || values.img === "" || values.password === "")
      return;
    else {
      const response = (await axios.post(url, values)).data;
      setTodos(response);
      notify();
    }
    setValues({ text: "", img: "", password: "" });
  };

  const getRequest = async () => {
    try {
      const response = (await axios.get(url)).data;
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRequest();
  }, []);
  const deleteAll = async () => {
    try {
      await axios.delete(url);
      setTodos([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className={scss.content}>
        <h1>Todo List </h1>
        <input
          id="text"
          type="text"
          placeholder="text"
          value={values.text}
          onChange={handleChange}
        />
        <input
          id="img"
          type="url"
          placeholder="image"
          value={values.img}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />

        <button
          className={scss.button}
          onClick={() => {
            postRequest();
          }}
        >
          add
        </button>
        <button className={scss.delete} onClick={deleteAll}>
          deleteAll
        </button>
        <ToastContainer />
        <TodoList todos={todos} getRequest={getRequest} />
      </div>
    </div>
  );
};

export default Todo;
