import styled from "@emotion/styled";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;
// Yup 적용해보기
// npm install yup @hookform/resolvers

// yup 관련 설정

// 1. schema 를 먼저 설정한다.
const schema = yup.object({
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상입니다.")
    .required("이름은 필수입니다."),
  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일은 필수입니다."),
  pw: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 8자 이상입니다.")
    .max(16, "비밀번호는 16자까지 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    ),
  pwconfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("pw")], "비밀번호가 일치하지 않습니다."),

  policy: yup.boolean().oneOf([true], "이용약관에 동의해주세요."),
});

// 2. schema 가 만들어지면 hookform 과 연결한다. (resolver)

// 전화번호에 - 를 붙여줌.
const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

function Join() {
  // register : 입력창을 훅폼에 등록한다.
  // handleSubmt : 입력창에 내용을 입력 후 전송 실행시 처리
  // getValues : 입력된 값 추출하기
  // formState: { errors } : 폼의 에러상태를 이용해서 유효성 검사 적용하기
  // defaultValues: form 태그의 요소에 초기값 셋팅하기
  // reset : form 태그의 요소에 값 리셋하기

  // mode: 원하는 시점
  // - onChange  : 즉시, 즉시, 유효성 검사실행하기
  // - onBlur    : 사용자가 폼 외부를 클릭한 경우 검사실행하기
  // - onSubmit  : 실행시에만 폼 유효성 검사실행하기
  // - all       : onChange 와 onBlur 모두 포함

  // trigger    : 초기 화면 출력시 폼 유효성 검사실행하기

  // setValue  :  강제로 폼의 값을 대입하기

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger, // 유효성 검사 즉시 실행
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      pw: "",
      pwconfirm: "",
      birthday: "",
      gender: "",
      phone: "",
      address: {
        postcode: "",
        basic: "",
        detail: "",
      },
      policy: false,
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  // 전송용 데이터
  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
    console.log("전송시 데이터 sendData ", sendData);
  };

  // 유효성 검사 즉시 실행
  useEffect(() => {
    //trigger();
  }, [trigger]);

  // Daum Post 적용하기
  // npm i react-daum-postcode
  // 1단계
  // : 외부 자바스크립트를 불러들여서 사용하는 방법
  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 2단계 : 선택시 주소 입력창 팝업창 띄우기
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        setValue("address.postcode", data.zonecode);
        setValue("address.basic", data.address);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector('input[name="address.detail"]').focus();
      },
    }).open();
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input {...register("name")} />
          {/* name 이 없을 때 에러 내용 출력자리 */}
          {errors.name && <ErrorDiv>{errors.name.message}</ErrorDiv>}
        </div>
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="text" {...register("pw")} />
          {errors.pw && <ErrorDiv>{errors.pw.message}</ErrorDiv>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="text" {...register("pwconfirm")} />
          {errors.pwconfirm && <ErrorDiv>{errors.pwconfirm.message}</ErrorDiv>}
        </div>
        <div>
          <label>생년월일</label>
          <input type="date" {...register("birthday")} />
          {errors.birthday && <p>{errors.birthday.message}</p>}
        </div>
        <div>
          <label>성별</label>
          <select {...register("gender")}>
            <option value={""}>선택해주세요.</option>
            <option value={"male"}>남성</option>
            <option value={"female"}>여성</option>
            <option value={"other"}>기타</option>
          </select>
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="tel"
            {...register("phone")}
            onChange={e => {
              const tempPhone = formatPhoneNumber(e.target.value);
              // setValue: hookform 의 기능 중 강제로 값을 대입하기
              setValue("phone", tempPhone);
            }}
          />
          {errors.phone && <ErrorDiv>{errors.phone.message}</ErrorDiv>}
        </div>

        <div>
          <label>우편번호</label>
          <input {...register("address.postcode")} placeholder="12345" />
          <button onClick={() => handleAddressSearch()}>우편번호 찾기</button>
        </div>

        <div>
          <label>주소</label>
          <input {...register("address.basic")} placeholder="기본주소" />
        </div>

        <div>
          <label>상세주소</label>
          <input {...register("address.detail")} placeholder="상세주소" />
        </div>

        <div>
          <input type="checkbox" {...register("policy")} />
          <label>이용약관에 동의합니다.</label>
          {errors.policy && <ErrorDiv>{errors.policy.message}</ErrorDiv>}
          <div style={{ height: 150, overflowX: "hidden", overflowY: "auto" }}>
            Lorem ipsum dolor sit amet, itaque eos. Accusamus, necessitatibus
            ratione.
          </div>
        </div>

        <div>
          <input type="button" onClick={() => reset()} value="다시작성" />
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
