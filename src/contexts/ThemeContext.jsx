import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Context 생성
export const ThemeContext = createContext(); // 명시적 내보내기

// LocalStorage 및 Cookie Key
const THEME_LS_KEY = "theme";
const THEME_COOKIE_KEY = "themeCookie";

// provider 정의
export const ThemeProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies([THEME_COOKIE_KEY]);
  const [theme, setTheme] = useState("light"); // 초기 상태는 기본값으로 설정
  // 초기화: 쿠키 또는 LocalStorage에서 테마를 가져옴
  useEffect(() => {
    const savedTheme =
      cookies[THEME_COOKIE_KEY] ||
      localStorage.getItem(THEME_LS_KEY) ||
      "light";
    setTheme(savedTheme); // 초기화 시 한 번만 상태를 설정
  }, [cookies]);

  // 테마 변경 함수
  const handleChangeTheme = () => {
    console.log(theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_LS_KEY, newTheme); // LocalStorage에 저장
      setCookie(THEME_COOKIE_KEY, newTheme, {
        path: "/",
        maxAge: 24 * 60 * 60, // 쿠키 유효 기간: 1일
      });
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
