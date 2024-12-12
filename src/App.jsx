import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import { TodoProvider } from "./contexts/TodoContext";
import { LoginProvider } from "./contexts/LoginContext";
import LoginPage from "./pages/member/LoginPage";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Schedule from "./pages/calendar/Schedule";
import Join from "./pages/member/Join";

function App() {
  return (
    <LoginProvider>
      <ThemeProvider>
        <TodoProvider>
          <Router>
            <Layout>
              <Routes>
                {/* 소개 */}
                <Route path="/" element={<About />} />
                {/* 멤버 */}
                <Route path="/member" element={<Join />} />

                {/* 로그인 */}
                <Route path="/login" element={<LoginPage />} />
                {/* 스케쥴 */}
                <Route path="/schedule" element={<Schedule />} />
                {/* Todo 중첩 */}
                <Route path="/todo">
                  <Route index element={<TodoIndex />}></Route>
                  <Route path="add" element={<TodoAdd />}></Route>
                  <Route path="detail" element={<TodoDetail />}></Route>
                  <Route path="edit/:id" element={<TodoEdit />}></Route>
                </Route>
                {/* 잘못된 패스 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Layout>
          </Router>
        </TodoProvider>
      </ThemeProvider>
    </LoginProvider>
  );
}
export default App;
