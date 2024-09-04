import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import "../index.css";
import {addTodo, completedTodo, editTodo, filterTodo, removeTodo} from "../TodoSlice";
import { useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import Todo from "./Todo";
import Select from "./Select";
import Form from "./Form";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [editTodoId, setEditTodoId] = useState<null | number>(null);
  const [newText, setNewText] = useState<string>("");

  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((s: RootState) => s.todos.filter);
  console.log(todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: inputValue,
          completed: false,
        })
      );
    }

    setInputValue("");
  };
  const handleCompleted = (id: number) => {
    dispatch(completedTodo(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(filterTodo(e.target.value));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; // для фильтра "all" возвращаем все задачи
  });

  const handleEditClick = (todo: { id: number; text: string }) => {
    setEditTodoId(todo.id);
    setNewText(todo.text);
  };
  const handleSaveClick = () => {
    if (editTodoId) {
      dispatch(editTodo({ id: editTodoId, text: newText }));
      setEditTodoId(null);
      setNewText("");
    }
  };
  return (
    <div className="app">
      <Header />
      <main>
       <Form inputValue={inputValue} setInputValue={setInputValue} handleAdd={handleAdd}/>
        <Select filter={filter} handleSelect={handleSelect}/>
        <div className="lengthTodo"><span>Всего: {filteredTodos.length}</span></div>
        <div className="todos">
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleCompleted={handleCompleted}
              handleRemove={handleRemove}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              editTodoId={editTodoId}
              setNewText={setNewText}
              newText={newText}
            />
          ))}
          {!filteredTodos.length && (
            <h3 style={{ textAlign: "center" }}>
              Здесь пусто. Добавьте задачу
            </h3>
          )}
        </div>
      </main>
    </div>
  );
}
export default App;