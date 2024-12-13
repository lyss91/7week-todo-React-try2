import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./range.css"; // 스타일 파일 추가

function RangeSchedule() {
  // **상태 관리**

  // 현재 선택된 날짜 상태
  const [date, setDate] = useState(new Date());
  // 샘플 일정
  // 일정 데이터 상태 (초기 데이터 포함)
  const [scheduleData, setScheduleData] = useState({
    "sc-1": {
      startDate: "2024-12-05",
      endDate: "2024-12-14",
      event: {
        id: 1,
        title: "🍳프로젝트 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
      },
    },
    "sc-2": {
      startDate: "2024-12-01",
      endDate: "2024-12-17",
      event: {
        id: 2,
        title: "🥗공부 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
      },
    },
    "sc-3": {
      startDate: "2024-12-09",
      endDate: "2024-12-25",
      event: {
        id: 3,
        title: "🍕공부 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
      },
    },
  });

  // 다음 생성될 고유 id와 sc-숫자 상태
  const [currentId, setCurrentId] = useState(4);
  const [currentSc, setCurrentSc] = useState(4);
  // 선택된 일정과 팝업창 상태
  const [selectSchedule, setSelectSchedule] = useState(null); // 선택된 일정
  const [showPopup, setShowPopup] = useState(false); // 팝업 열림/닫힘
  // 수정 모드 상태
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  // 새 일정 추가/수정 시 입력받을 데이터 상태
  const [newSchedule, setNewSchedule] = useState({
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
  }); // 새 일정 데이터

  // **무지개 색상 배열 (일정 색상 지정)**
  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ];

  // 일정별 색상 매핑
  const scheduleColors = {};
  Object.keys(scheduleData).forEach((key, index) => {
    scheduleColors[key] = rainbowColors[index % rainbowColors.length];
  });

  // **요일 형식 변환 함수**
  // Calendar의 요일을 한국어로 표시
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    return weekName[date.getDay()];
  };

  //   특정 날짜의 모든 일정을 뽑아서 관리해줄 함수
  const getEventsDate = date => {
    let allEvents = [];
    //   console.log(formatedDate);
    // 범위에 맞는 내용 처리
    //  반목문을 사용한다.
    // 모든 scheduleData 에 저장해둔 내용에서 반복문을 돌린다.
    Object.keys(scheduleData).forEach(item => {
      // 하나 하나의 객체에 있는 내용을 알아낸다.
      const rangeSchedule = scheduleData[item];
      // 날짜가 범위에 속하는지 확인

      // Date 객체로 만들어서 날짜를 비교하는 용도로 활용을 한다.
      if (isDateInRange(date, rangeSchedule.startDate, rangeSchedule.endDate)) {
        allEvents.push({ ...rangeSchedule.event, color: scheduleColors[item] });
      }
    });
    return allEvents; // 해당 날짜 일정에 해당하는 모든 이벤트 반환
  };

  // **날짜 범위 확인 함수**
  // 특정한 시작과 종료 날짜의 범위에 있는지 없는지를 검사하는 함수
  const isDateInRange = (날짜, 시작일, 종료일) => {
    // 날짜가 시작일 보다 작은지,
    // 날짜가 종료일 보다 큰지,
    const checkDay = new Date(날짜); // "2024-12-00...."
    const startDay = new Date(시작일); // "2024-12-05"
    const endDay = new Date(종료일); // "2024-12-14"

    return checkDay >= startDay && checkDay <= endDay; // checkDay 가 startDay 보다 크거나 같고
  };

  //   출력 부분 : 날짜 타일에 출력할 내용 자리
  const tileContent = e => {
    const { date, view } = e;

    // 뽑아놓은 데이터를 모아준다.
    let dayEvents = [];

    if (view === "month") {
      const formatedDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
      //   특정 날짜를 전달한다
      //    날짜를 이용해서 > 비교해서 > 일정이 있는지? > 있다면 몇개인지..
      const dayEvents = getEventsDate(formatedDate); // 해당 날짜의 이벤트 가져오기

      //  타일에 일정 표시 html 만들어서 출력하기
      if (dayEvents.length > 0) {
        // 데이터가 있다면, 비교 날짜와 시작 날짜가 같은 경우에 대해서만 글자 출력하고,
        // 나머지는 시작부터 종료일 까지 배경색만을 출력한다.
        return (
          <div style={{ textAlign: "center", fontSize: "12px" }}>
            {dayEvents.map(item => (
              <div
                key={item.id}
                style={{
                  color: "white",
                  backgroundColor: item.color,
                  padding: "2px",
                  borderRadius: "5px",
                  margin: "2px",
                }}
                onClick={() => handleClickSchedule(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };
  // 새로운 일정 추가 함수
  // **일정 클릭 시 팝업 열기**
  const handleClickSchedule = item => {
    setSelectSchedule(item);
    setShowPopup(true);
  };

  // **새 일정 추가**
  const handleAddSchedule = () => {
    const newSc = `sc-${currentSc}`;
    const newId = currentId;
    setScheduleData(prev => ({
      ...prev,
      [newSc]: {
        startDate: newSchedule.startDate,
        endDate: newSchedule.endDate,
        event: { id: newId, ...newSchedule },
      },
    }));
    setCurrentId(newId + 1); // id 증가
    setCurrentSc(prev => prev + 1); // sc-숫자 증가
    setNewSchedule({ startDate: "", endDate: "", title: "", desc: "" }); // 입력 초기화
  };

  // **일정 수정**
  const handleEditSchedule = () => {
    const updatedSchedules = { ...scheduleData };
    Object.keys(updatedSchedules).forEach(key => {
      if (updatedSchedules[key].event.id === selectSchedule.id) {
        updatedSchedules[key].event = {
          ...updatedSchedules[key].event,
          title: newSchedule.title || updatedSchedules[key].event.title,
          desc: newSchedule.desc || updatedSchedules[key].event.desc,
        };
      }
    });
    setScheduleData(updatedSchedules);
    setEditMode(false);
    setShowPopup(false);
  };

  // **일정 삭제**
  const handleDeleteSchedule = () => {
    const updatedSchedules = { ...scheduleData };
    Object.keys(updatedSchedules).forEach(key => {
      if (updatedSchedules[key].event.id === selectSchedule.id) {
        delete updatedSchedules[key];
      }
    });
    setScheduleData(updatedSchedules);
    setShowPopup(false);
  };

  return (
    <div>
      <h1>[일정] RangeSchedule.jsx</h1>

      {/* 새 일정 추가 폼 */}
      <div>
        <h3>새 일정 추가</h3>
        <input
          type="date"
          value={newSchedule.startDate}
          onChange={e =>
            setNewSchedule(prev => ({ ...prev, startDate: e.target.value }))
          }
          placeholder="시작 날짜"
        />
        <input
          type="date"
          value={newSchedule.endDate}
          onChange={e =>
            setNewSchedule(prev => ({ ...prev, endDate: e.target.value }))
          }
          placeholder="종료 날짜"
        />
        <input
          type="text"
          value={newSchedule.title}
          onChange={e =>
            setNewSchedule(prev => ({ ...prev, title: e.target.value }))
          }
          placeholder="일정 제목"
        />
        <textarea
          value={newSchedule.desc}
          onChange={e =>
            setNewSchedule(prev => ({ ...prev, desc: e.target.value }))
          }
          placeholder="일정 설명"
        />
        <button onClick={handleAddSchedule}>일정 추가</button>
      </div>

      {/* 캘린더 */}
      <div>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          value={date}
          onChange={e => setDate(e)}
          tileContent={tileContent}
        />
      </div>

      {/* 팝업 창 */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            {editMode ? (
              <>
                <h3>일정 수정</h3>
                <input
                  type="text"
                  placeholder="제목"
                  value={newSchedule.title}
                  onChange={e =>
                    setNewSchedule(prev => ({ ...prev, title: e.target.value }))
                  }
                />
                <textarea
                  placeholder="설명"
                  value={newSchedule.desc}
                  onChange={e =>
                    setNewSchedule(prev => ({ ...prev, desc: e.target.value }))
                  }
                />
                <button onClick={handleEditSchedule}>저장</button>
                <button onClick={() => setEditMode(false)}>취소</button>
              </>
            ) : (
              <>
                <h3>{selectSchedule.title}</h3>
                <p>{selectSchedule.desc}</p>
                <button onClick={() => setEditMode(true)}>수정</button>
                <button onClick={handleDeleteSchedule}>삭제</button>
                <button onClick={() => setShowPopup(false)}>닫기</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default RangeSchedule;
