import deleteImg from "../assets/delete.svg";
import pencilImg from "../assets/pencil.png";
interface TodoProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  editTodoId: number | null;
  newText: string;
  setNewText: (text: string) => void;
  handleCompleted: (id: number) => void;
  handleEditClick: (todo: {
    id: number;
    text: string;
    completed: boolean;
  }) => void;
  handleRemove: (id: number) => void;
  handleSaveClick: () => void;
}

const Todo: React.FC<TodoProps> = ({ todo, ...props }) => {
  return (
    <div key={todo.id} className={todo.completed ? "todo-completed" : "todo"}>
      <div className="info">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => props.handleCompleted(todo.id)}
        />
        <div className="text">
          {props.editTodoId === todo.id ? (
            <>
              <input
                className="input-edit"
                type="text"
                value={props.newText}
                onChange={(e) => props.setNewText(e.target.value)}
              />
              <button
                className={`${
                  props.newText.trim().length ? "btn-edit" : "btn-edit-dis"
                }`}
                disabled={!props.newText.trim().length}
                onClick={props.handleSaveClick}
              >
                Save
              </button>
            </>
          ) : (
            <>
              {todo.text}
              <span className="date">
                {new Date().toLocaleDateString("RU-ru")}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          className="btn-todo"
          onClick={() => props.handleEditClick(todo)}
        >
          <img src={pencilImg} alt="изменить" />
        </button>
        <button
          className="btn-todo"
          onClick={() => props.handleRemove(todo.id)}
        >
          <img src={deleteImg} alt="удалить" />
        </button>
      </div>
    </div>
  );
};

export default Todo;