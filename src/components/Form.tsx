interface FormProps {
    inputValue: string;
    handleAdd: (event: React.FormEvent<HTMLFormElement>) => void; // Функция для обработки отправки формы
    setInputValue: (value: string) => void; // Функция для установки значения input
  }
const Form = ({ inputValue, handleAdd, setInputValue }: FormProps) => {
    return (
        <form className="form" onSubmit={handleAdd}>
        <input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          className="input"
          type="text"
          placeholder="Add to task"
        />
        <button className="btn-add" disabled={!inputValue.trim().length}>
          Add
        </button>
      </form>
    );
};

export default Form;