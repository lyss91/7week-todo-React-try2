import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <form>
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
