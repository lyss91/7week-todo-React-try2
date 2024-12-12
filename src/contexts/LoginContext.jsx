import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Context 생성
export const LoginContext = createContext();

// LocalStorage 및 Cookie Key
const LOGIN_LS_KEY = "isLoggedIn";
const LOGIN_COOKIE_KEY = "isLoggedInCookie";

// Context Provider 정의
export const LoginProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([LOGIN_COOKIE_KEY]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. 애플리케이션이 처음 로드될 때 LocalStorage 및 쿠키에서 상태를 읽어옴
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem(LOGIN_LS_KEY);
    const cookieLoginStatus = cookies[LOGIN_COOKIE_KEY];

    if (cookieLoginStatus !== undefined) {
      setIsLoggedIn(cookieLoginStatus === "true");
    } else if (storedLoginStatus !== null) {
      setIsLoggedIn(storedLoginStatus === "true");
      setCookie(LOGIN_COOKIE_KEY, storedLoginStatus === "true", {
        path: "/",
        maxAge: 24 * 60 * 60, // 쿠키 유효 기간: 1일
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies, setCookie]);

  // 2. 로그인 함수
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem(LOGIN_LS_KEY, "true"); // LocalStorage에 상태 저장
    setCookie(LOGIN_COOKIE_KEY, true, {
      path: "/",
      maxAge: 24 * 60 * 60, // 쿠키 유효 기간: 1일
    });
  };

  // 3. 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(LOGIN_LS_KEY, "false"); // LocalStorage에 상태 저장
    setCookie(LOGIN_COOKIE_KEY, false, {
      path: "/",
      maxAge: 24 * 60 * 60, // 쿠키 유효 기간: 1일
    });
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Context Hook
export const useLogin = () => useContext(LoginContext);
