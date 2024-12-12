import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const initTodo = {
  id: 0,
  title: "",
  content: "",
  author: "",
  date: "",
  complete: 0,
  privacy: 0,
};
function TodoEdit() {
  // Context 사용하기
  const { todoList, updateTodo } = useContext(TodoContext);
  // useState 화면 리랜더링
  const [formData, setFormData] = useState(initTodo);
  // Params 로 id 를 추출하세요.
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect 에서 id 를 이용해서 출력할 내용 추출
  const getTodo = () => {
    // id 를 이용해서 목록 state 에서 필요로 한 내용 추출
    const findData = todoList.filter(item => item.id === parseInt(id));
    const findTodo = findData[0];
    setFormData({ ...findTodo });
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    // console.log(name, value, type, checked);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = e => {
    // 새로고침하면 입력중 자료 모두 초기화
    e.preventDefault();
    updateTodo(formData);
    alert("내용이 수정되었습니다.");
    navigate(`/todo/detail?id=${formData.id}`);
  };

  const handleClickBack = () => {
    navigate(`/todo/detail?id=${formData.id}`);
  };

  useEffect(() => {
    getTodo();
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoEdit</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          id="author"
          readOnly
          disabled
        />
        <br />

        <label>
          제목
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={e => handleChange(e)}
          />
        </label>

        <br />

        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          value={formData.content}
          id="content"
          onChange={e => handleChange(e)}
        ></textarea>
        <br />
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={e => handleChange(e)}
          id="date"
        />
        <br />
        <label htmlFor="complete">완료여부</label>
        <input
          type="checkbox"
          name="complete"
          // value={formData.complete}
          checked={formData.complete === 1 ? true : false}
          onChange={e => handleChange(e)}
          id="complete"
        />
        <br />
        <label htmlFor="privacy">공개여부</label>
        <input
          type="checkbox"
          name="privacy"
          // value={formData.privacy}
          checked={formData.privacy === 1 ? true : false}
          onChange={e => handleChange(e)}
          id="privacy"
        />
        <br />
        <div>
          <button type="submit">수정하기</button>
          <button
            type="button"
            onClick={() => {
              handleClickBack();
            }}
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodoEdit;
