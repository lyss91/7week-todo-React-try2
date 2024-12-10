import { useContext, useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

function TodoList() {
  // Context 사용함.
  const { todoList } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/todo/add");
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        {/* 여기에 목록 출력 */}
        <ul>
          {todoList.map(item => {
            return (
              <li key={item.id}>
                <TodoItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button
          onClick={() => {
            handleClickAdd();
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
export default TodoList;
