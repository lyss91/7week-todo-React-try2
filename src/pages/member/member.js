import axios from "axios";
import { data } from "react-router-dom";

// 5. axios 연동하기.
// 5. 회원가입 API 연동
export const postMember = data => {
  console.log(data);
  try {
    // 보통 ip주소는 proxy로 대체 됩니다.
    const res = axios.post("http://192.168.0.66:5000/member");
    console.log("회원가입 결과", res.data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 5. login API
export const postloginMember = async () => {
  try {
    const res = await axios.post("http://192.168.0.66:5000/member", data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
