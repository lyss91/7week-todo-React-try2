import { useContext } from "react";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
import ThemeContext from "../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  // 테마별 스타일 설정
  const themeStyles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#121212", // 테마별 배경색
    color: theme === "light" ? "#000000" : "#ffffff", // 테마별 텍스트 색상
    minHeight: "100vh", // 화면 전체에 스타일 적용
    transition: "background-color 0.3s, color 0.3s", // 부드러운 전환 효과
  };

  return (
    <div style={themeStyles}>
      <Header />
      <main>{children}</main>
      <Footer>
        <p>Copyright 2024. By Hong</p>
      </Footer>
    </div>
  );
};

export default Layout;
