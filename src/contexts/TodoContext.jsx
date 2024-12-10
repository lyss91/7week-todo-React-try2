import { createContext, useEffect, useState } from "react";
import { TODO_MOCK_DATA } from "../contants/mockdata";

export const TodoContext = createContext();

// Local Storage 여러가지 값이 보관되므로 구분용 Key 가 필요해요.
const TODO_LS_KEY = "todos";

export const TodoProvider = ({ children }) => {
  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // setCountId(prev => prev + 1);
    // state 는 한템포 느리게 업데이트 되므로.. 즉시 갱신이 안된다.
    // localStorage.setItem(TODO_LS_KEY, JSON.stringify([...todoList]));
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
  };

  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
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
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
  };

  const resetTodo = () => {
    localStorage.clear(TODO_LS_KEY);
    setTodoList([]);
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
    // console.log("의존성 없어요.");
    // 웹브라우저 Local Storage 에 값을 읽어들임
    const todos = localStorage.getItem(TODO_LS_KEY);
    if (todos) {
      // alert("기존 보관하던 데이터가 있습니다.");
      // 글자를 js 에서 사용할 수 있도록 변환하자.!!!
      const datas = JSON.parse(todos);
      setTodoList(datas);
      // setCountId(datas.length);
    } else {
      // alert("없네요. 초기값 셋팅!");
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
      // setCountId(0);
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
