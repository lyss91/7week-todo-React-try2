import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
function TodoAdd() {
  // Context 사용하기
  const { addTodo } = useContext(TodoContext);
  // useState 화면 리랜더링
  const [formData, setFormData] = useState(initTodo);
  const navigate = useNavigate();

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
    addTodo(formData);
    alert("내용이 추가되었습니다.");
    navigate(`/todo`);
  };

  const handleClickBack = () => {
    navigate(`/todo`);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>Todo Add</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={e => handleChange(e)}
          id="author"
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
          <button type="submit">등록하기</button>
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
export default TodoAdd;
