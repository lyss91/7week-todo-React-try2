import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

function TodoDetail() {
  const { todoList } = useContext(TodoContext);
  // js 로 패스 이동하기
  const navigate = useNavigate();
  // SearchParams 를 이용해서 내용 출력
  const [searchParams, _] = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  const [todo, setTodo] = useState({});

  const getTodo = () => {
    // id 를 이용해서 state 에서 필요로 한 내용 추출
    const findData = todoList.filter(item => item.id === id);
    // console.log(findData);
    const findTodo = findData[0];
    // console.log(findTodo);
    // setTodo 에 담고
    setTodo({ ...findTodo });
    // 화면 리랜더링 출력
  };

  const handleClickEdit = () => {
    // Link 말고 js 로 이동하기
    // Link 는 a태그로 이동하는 것!
    navigate(`/todo/edit/${todo.id}`);
  };

  useEffect(() => {
    getTodo();
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoDetail</h1>
      <div>
        작성자 : {todo.author}
        <br />
        날짜 : {todo.date}
        <br />
        제목 : {todo.title}
        <br />
        내용: {todo.content}
        <br />
      </div>
      <div>
        <button
          onClick={() => {
            handleClickEdit();
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
        >
          목록보기
        </button>
      </div>
    </div>
  );
}
export default TodoDetail;
