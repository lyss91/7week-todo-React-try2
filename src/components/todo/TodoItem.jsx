import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const TodoItem = ({ item }) => {
  // Context 사용하기
  const { deleteTodo } = useContext(TodoContext);
  // Link: 삭제, 자세히 보기 버튼
  // 제목, 작성자, 날짜
  // 제목을 클릭하면 상세페이지로 이동하세요.
  // 링크는 SearchParam 을 이용하여 주세요.(쿼리스트링)
  return (
    <div>
      <Link to={`/todo/detail?id=${item.id}`}>{item.title}</Link> {item.author}{" "}
      {item.date}
      <br />
      <button
        onClick={() => {
          deleteTodo(item.id);
        }}
      >
        삭제하기
      </button>
    </div>
  );
};
export default TodoItem;
