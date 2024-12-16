import { useContext } from "react";
import { Link, navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { postloginMember } from "./member";

function LoginPage() {
  const { login } = useContext(LoginContext);
  // 6. 로그인 시도
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const result = await postloginMember({});
      if (result.data) {
        // 6. 사용자가 로그인 했음을 관리
        login();
        // 6. 화면이동
        navigate("/");
      } else {
        alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <label>이메일</label>
          <input />
        </div>
        <div>
          <label>비밀번호</label>
          <input />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">비밀번호 찾기</Link>
          <Link to="">이메일 찾기</Link>
          <Link to="/member">회원가입하기</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
