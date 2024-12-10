import { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const LoginContext = createContext();

// LocalStorage Key
const LOGIN_LS_KEY = "isLoggedIn";

// Context Provider 정의
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. 애플리케이션이 처음 로드될 때 LocalStorage에서 상태를 읽어옴
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem(LOGIN_LS_KEY);
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  // 2. 로그인 함수
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem(LOGIN_LS_KEY, "true"); // LocalStorage에 상태 저장
  };

  // 3. 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(LOGIN_LS_KEY, "false"); // LocalStorage에 상태 저장
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Context Hook
export const useLogin = () => useContext(LoginContext);

export default LoginContext;
