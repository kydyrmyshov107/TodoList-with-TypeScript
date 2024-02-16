import axios from "axios";
import { FC, useState } from "react";
import scss from "./TodoList.module.scss";
import Todo from "../todo/Todo";

const url = import.meta.env.VITE_BACKEND_ULR;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TodoList: FC<{ todos: Todo[]; getRequest: () => void }> = ({
  todos,
  getRequest,
}) => {
  const [values, setValues] = useState<Todo>({
    _id: 0,
    text: "",
    img: "",
    password: "",
  });

  const [edit, setEdit] = useState<number | null>(null);

  const deleteRequest = async (id: number) => {
    await axios.delete(`${url}/${id}`);
    getRequest();
  };

  const editTodo = async (item: Todo) => {
    setValues(item);
    setEdit(item._id);
  };

  const saveTodo = async (id: number) => {
    const newData = {
      text: values.text,
      img: values.img,
      password: values.password,
    };
    await axios.patch(`${url}/${id}`, newData);
    setEdit(0);
    getRequest();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div className={scss.box}>
      {todos.map((item) => (
        <div className={scss.card} key={item._id}>
          {edit === item._id ? (
            <>
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
                placeholder="img"
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
                onClick={() => saveTodo(item._id)}
              >
                save
              </button>
              <button className={scss.button} onClick={() => setEdit(null)}>
                cancel
              </button>
            </>
          ) : (
            <>
              <p>{item.text}</p>
              <img src={item.img} alt="image" />
              <p>{item.password}</p>
              <button
                className={scss.buttonPatch}
                onClick={() => {
                  values.text, values.password, values.img;
                  editTodo(item);
                }}
              >
                patch
              </button>
              <button
                className={scss.buttonDelete}
                onClick={() => deleteRequest(item._id)}
              >
                delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
