import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext"; // 명시적 가져오기
import { LoginContext } from "../../contexts/LoginContext";
import { FaHeartCircleCheck } from "react-icons/fa6";

const Header = () => {
  const { isLoggedIn, login, logout } = useContext(LoginContext); // login, logout 가져오기
  const { handleChangeTheme, theme } = useContext(ThemeContext);

  // 링크 스타일 정의
  const linkStyle = {
    color: theme === "light" ? "#000000" : "#FFFFFF", // 테마에 따라 텍스트 색상 설정
    textDecoration: "none", // 밑줄 제거
    padding: "5px 10px", // 내부 여백 추가
    border: `1px solid ${theme === "light" ? "#000000" : "#FFFFFF"}`, // 테두리 추가
    borderRadius: "5px", // 둥근 테두리
    margin: "0 5px", // 링크 간 간격 추가
  };

  return (
    <header>
      <Link to={"/"} style={linkStyle}>
        <FaHeartCircleCheck /> Home
      </Link>
      <Link to={"/"} style={linkStyle}>
        About
      </Link>
      <Link to={"/member"} style={linkStyle}>
        회원가입
      </Link>
      <Link to={"/schedule"} style={linkStyle}>
        스케쥴
      </Link>
      <Link to={"/range"} style={linkStyle}>
        일정
      </Link>
      <Link to={"/todo"} style={linkStyle}>
        Todo
      </Link>
      <Link to={"/login"} style={linkStyle}>
        로그인
      </Link>
      <button
        onClick={() => {
          isLoggedIn ? logout() : login(); // 상태에 따라 login 또는 logout 호출
        }}
      >
        {isLoggedIn ? "로그아웃 하세요." : "로그인 하세요."}
      </button>
      <button
        onClick={() => {
          handleChangeTheme();
        }}
      >
        테마변경
      </button>
    </header>
  );
};
export default Header;
