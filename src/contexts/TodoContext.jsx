import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const TodoContext = createContext();

// Local Storage 여러가지 값이 보관되므로 구분용 Key 가 필요해요.
const TODO_LS_KEY = "todos";
const TODO_SESSION_KEY = "todos_session";

const TODO_COOKIE_NAME = "todos_cookie";

export const TodoProvider = ({ children }) => {
  // 쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);

  const [todoList, setTodoList] = useState([]);
  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // 로컬에 저장함 (합당함)

    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 세션에 저장함 (웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);

    // 로컬 내용삭제
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));

    // 세션 내용삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newList]));

    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
    alert(`${id}번 글이 삭제했어요`);
  };
  const updateTodo = formData => {
    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });
    setTodoList(newTodoData);
    // 로컬
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 세션 내용삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));
    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const resetTodo = () => {
    localStorage.clear(TODO_LS_KEY);
    setTodoList([]);
    // 로컬 삭제
    localStorage.clear(TODO_LS_KEY);
    // 세션 내용삭제
    sessionStorage.clear(TODO_SESSION_KEY);
    // 쿠키에 삭제함 (서버연동 보관이 아니라서 비추천)
    removeCookie(TODO_COOKIE_NAME);
  };

  // todoList State 가 바뀌면 실행하고 싶은 일이 있다.
  // useEffect(() => {
  //   console.log("의존성!!!! 있어요.");
  //   localStorage.setItem(TODO_LS_KEY, JSON.stringify([...todoList]));
  //   // Local Storage에 보관하자.
  //   return () => {};
  // }, [todoList]);

  // Context 가 화면에 출력될 때, Local Storage 에서 값을 읽어온다.
  // 이때 Key 는 TODO_LS_KEY 에 담긴 값을 이용해서 가져옮.
  useEffect(() => {
    // 로컬 자료 읽기
    const todos = localStorage.getItem(TODO_LS_KEY);
    // 세션 자료 읽기
    const todosSession = sessionStorage.getItem(TODO_SESSION_KEY);
    // 쿠키 읽기
    const todosCookie = cookies[TODO_COOKIE_NAME];
    // 로컬 초기화
    if (todos) {
      // alert("기존 보관하던 데이터가 있습니다.");
      // 글자를 js 에서 사용할 수 있도록 변환하자.!!!
      const datas = JSON.parse(todos);
      setTodoList(datas);
      // setCountId(datas.length);
    } else {
      // alert("없네요. 초기값 셋팅!");
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
    }
    // 세션 초기화
    if (todosSession) {
      const datas = JSON.parse(todosSession);
      setTodoList(datas);
    } else {
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
    }

    // 쿠키 초기화
    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }

    return () => {};
  }, []);

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
