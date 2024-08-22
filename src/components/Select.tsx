interface SelectProps {
  filter: string; // тип фильтра как строка
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void; // тип функции-обработчика
}
const Select = ({ filter, handleSelect }: SelectProps) => {
  return (
    <ul className="category">
      <select className="select" value={filter} onChange={handleSelect}>
        <option className="option" value="all">
          Все
        </option>
        <option className="option" value="completed">
          Завершенные
        </option>
        <option className="option" value="incomplete">
          Незавершенные
        </option>
      </select>
    </ul>
  );
};

export default Select;
