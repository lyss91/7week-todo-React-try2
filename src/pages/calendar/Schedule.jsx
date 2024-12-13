// npm install react-calendar

// 필요한 React Hooks와 Calendar 라이브러리를 불러옵니다.
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

// Calendar의 기본 스타일을 포함합니다.
import "react-calendar/dist/Calendar.css";

// 추가적인 스타일을 정의한 CSS 파일
import "./schedule.css";

function Schedule() {
  // **4. 선택된 날짜 기록**:
  // Calendar에서 선택한 날짜를 저장하는 상태입니다.
  const [date, setDate] = useState(new Date());

  // **5. 선택된 스케줄 저장**:
  // 클릭한 일정 정보를 저장하는 상태입니다.
  const [selectSchedule, setSelectSchedule] = useState(null);

  // **5. 샘플 일정 데이터**:
  // 날짜별로 등록된 일정 데이터를 객체 형태로 관리합니다.
  const scheduleData = {
    "2024-12-13": [
      {
        id: 1,
        title: "오후 미팅🎉", // 일정 제목
        desc: "프로젝트 진행을 위한 기획 미팅 약속", // 상세 설명
        time: "16:00", // 시간
      },
      {
        id: 3,
        title: "저녁 약속🎃",
        desc: "주말을 위한 친구 미팅",
        time: "18:00",
      },
    ],
  };

  // **스케줄 선택 이벤트 핸들러**:
  // 특정 일정을 클릭했을 때 `selectSchedule` 상태에 저장합니다.
  const handleClickSchedule = item => {
    setSelectSchedule(item); // 클릭한 일정의 정보를 저장
    console.log(item); // 선택된 일정의 정보를 콘솔에 출력
  };

  // **3. 요일 형식 지정**:
  // Calendar의 요일(일~토)을 한국어로 표시하기 위한 함수입니다.
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"]; // 한국어 요일
    return weekName[date.getDay()]; // 해당 날짜의 요일 반환
  };

  // **5. 날짜 타일에 내용 출력**:
  // 각 날짜의 타일에 일정을 렌더링하는 함수입니다.
  const tileContent = e => {
    const { date, view } = e; // Calendar에서 전달된 props
    if (view === "month") {
      // **"YYYY-MM-DD" 형식으로 날짜를 변환**:
      const formatedDate = date.toLocaleDateString("en-CA"); // "2024-12-13" 형식
      const schedules = scheduleData[formatedDate]; // 해당 날짜의 스케줄 가져오기
      if (schedules) {
        return (
          <div className="schedule-content">
            {schedules.map(item => (
              <div
                key={item.id}
                className="schedule-item"
                onClick={() => handleClickSchedule(item)} // 일정 클릭 시 상세 정보 표시
              >
                {item.title} {/* 일정 제목 표시 */}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  // **4. 선택된 날짜 확인**:
  // 선택된 날짜가 변경될 때마다 `console.log`로 확인.
  useEffect(() => {
    console.log("선택된 날짜 : ", date);
  }, [date]);

  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <Calendar
          // **2. Calendar 설정**:
          calendarType="gregory" // 캘린더 유형 (그레고리 달력)
          formatShortWeekday={formatShortWeekday} // 요일 형식을 한국어로 변경
          value={date} // 현재 선택된 날짜 상태
          onChange={e => setDate(e)} // 날짜 선택 시 상태 업데이트
          tileContent={e => tileContent(e)} // 타일 내용 렌더링 함수
        />

        <h2>선택된 스케쥴</h2>
        {/* **선택된 일정 표시**: */}
        {selectSchedule && (
          <div
            className="schedule-detail"
            onClick={() => {
              setSelectSchedule(null); // 클릭 시 상세 정보 닫기
            }}
          >
            <div className="schedule-box">
              <h3>제목 : {selectSchedule.title}</h3> {/* 일정 제목 */}
              <p>시간 : {selectSchedule.time}</p> {/* 일정 시간 */}
              <p>내용 : {selectSchedule.desc}</p> {/* 일정 설명 */}
              <button
                className="bt-close"
                onClick={() => {
                  setSelectSchedule(null); // 닫기 버튼 클릭 시 상세 정보 닫기
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
