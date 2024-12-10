import { Link } from "react-router-dom";
import { useLogin } from "../../contexts/LoginContext";

const Header = () => {
  // LoginContext에서 상태와 함수 가져오기
  const { isLoggedIn, login, logout } = useLogin();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/todo">Todo</Link>
      </nav>
      <div>
        {/* 로그인 상태에 따라 버튼 변경 */}
        {isLoggedIn ? (
          <button onClick={logout}>로그아웃</button>
        ) : (
          <button onClick={login}>로그인</button>
        )}
      </div>
    </header>
  );
};

export default Header;
