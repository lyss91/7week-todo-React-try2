// React의 상태관리와 생명주기 훅을 위한 import
import { useState, useEffect } from "react";
// FullCalendar 메인 컴포넌트 import
import FullCalendar from "@fullcalendar/react";
// 월간/주간 달력 뷰를 위한 플러그인
import dayGridPlugin from "@fullcalendar/daygrid";
// 시간별 일정 표시를 위한 플러그인
import timeGridPlugin from "@fullcalendar/timegrid";
// 드래그 앤 드롭 기능을 위한 플러그인
import interactionPlugin from "@fullcalendar/interaction";

// 더미 데이터
const dummySchedules = {
  "2024-12-13": [
    {
      id: 1,
      title: "🎉오후 미팅",
      desc: "프로젝트 진행을 위한 기획 미팅 약속",
      time: "16:00",
    },
    {
      id: 3,
      title: "🧶저녁 약속",
      desc: "주말을 위한 친구 미팅",
      time: "18:00",
    },
  ],
  "2024-12-14": [
    {
      id: 4,
      title: "📚스터디",
      desc: "리액트 스터디 모임",
      time: "14:00",
    },
  ],
  "2024-12-15": [
    {
      id: 5,
      title: "💻코딩테스트",
      desc: "월간 코딩테스트 참여",
      time: "10:00",
    },
  ],
};

const dummyRangeSchedules = {
  "sc-1": {
    startDate: "2024-12-05",
    endDate: "2024-12-14",
    event: {
      id: 1,
      title: "🎈 프로젝트 기간",
      desc: "1차 프로젝트 협업 과제 기획 기간",
      eventBgColor: "red",
      eventColor: "white",
    },
  },
  "sc-2": {
    startDate: "2024-12-01",
    endDate: "2024-12-17",
    event: {
      id: 100,
      title: "🎎 공부기간",
      desc: "1차 프로젝트 협업 과제 기획 기간",
      eventBgColor: "orange",
      eventColor: "yellow",
    },
  },
  "sc-3": {
    startDate: "2024-11-28",
    endDate: "2024-12-09",
    event: {
      id: 80,
      title: "🎀 테스트기간",
      desc: "1차 프로젝트 협업 과제 기획 기간",
      eventBgColor: "green",
      eventColor: "white",
    },
  },
};
// FullSchedule 컴포넌트 정의
const Full = () => {
  // 캘린더 이벤트 목록을 관리하는 상태
  const [events, setEvents] = useState([]);
  // 모달 표시 여부를 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 선택된 날짜 정보를 관리하는 상태
  const [selectedDates, setSelectedDates] = useState(null);
  // 수정 모드 여부를 관리하는 상태
  const [isEditMode, setIsEditMode] = useState(false);
  // 선택된 이벤트 정보를 관리하는 상태
  const [selectedEvent, setSelectedEvent] = useState(null);
  // 로딩 상태를 관리하는 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 메시지를 관리하는 상태
  const [error, setError] = useState(null);
  // 새로운 이벤트 데이터를 관리하는 상태
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    backgroundColor: "#3788d8",
    time: "",
  });

  // 서버에서 이벤트 데이터를 가져오는 함수
  // 서버에서 이벤트 데이터를 가져오는 비동기 함수
  const fetchEvents = async () => {
    // 로딩 상태를 true로 설정하여 데이터 로딩 중임을 표시
    setIsLoading(true);
    try {
      // 더미 스케줄 데이터를 캘린더에 맞는 형식으로 변환
      //   실제로는 await 에 get 으로 호출해야합니다.
      // 그런데 서버가 없어서 그냥 가짜 Dummy로 대체 했습니다.
      const formattedEvents = formatEvents(dummySchedules, dummyRangeSchedules);
      // 변환된 이벤트 데이터를 상태에 저장
      setEvents(formattedEvents);
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 로깅
      console.error("일정을 불러오는데 실패했습니다:", error);
      // 사용자에게 보여줄 에러 메시지 설정
      setError("일정을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      // 성공/실패 여부와 관계없이 로딩 상태를 false로 설정
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 이벤트 데이터 로드
  useEffect(() => {
    fetchEvents();
  }, []);

  // 일정 데이터를 캘린더 이벤트 형식으로 변환하는 함수
  // 일정 데이터를 캘린더 이벤트 형식으로 변환하는 함수
  const formatEvents = (scheduleData, scheduleRangeData) => {
    // 변환된 이벤트들을 저장할 빈 배열 생성
    const events = [];

    // scheduleData 객체의 각 항목(날짜와 일정 배열)을 순회
    Object.entries(scheduleData).forEach(([date, schedules]) => {
      // 각 날짜의 일정 배열을 순회
      schedules.forEach(schedule => {
        // 일반 일정을 캘린더 이벤트 형식으로 변환하여 추가
        events.push({
          // 일정의 고유 식별자를 저장하는 필드
          id: schedule.id,
          // 일정 제목과 시간을 괄호로 묶어 함께 표시 (예: "회의 (14:00)")
          title: `${schedule.title} (${schedule.time})`,
          // 날짜와 시간을 ISO 8601 표준 형식으로 결합 (예: "2024-01-01T14:00")
          date: `${date}T${schedule.time}`,
          // 추가 속성을 저장하는 객체
          extendedProps: {
            // 일정에 대한 상세 설명을 저장하는 필드
            description: schedule.desc,
          },
        });
      });
    });

    // scheduleRangeData 객체의 각 기간 일정을 순회
    Object.values(scheduleRangeData).forEach(rangeSchedule => {
      // 기간 일정을 캘린더 이벤트 형식으로 변환하여 추가
      events.push({
        id: rangeSchedule.event.id, // 기간 일정의 고유 ID
        title: rangeSchedule.event.title, // 일정 제목
        start: rangeSchedule.startDate, // 시작 날짜
        end: rangeSchedule.endDate, // 종료 날짜
        backgroundColor: rangeSchedule.event.eventBgColor, // 배경색
        textColor: rangeSchedule.event.eventColor, // 텍스트 색상
        extendedProps: {
          description: rangeSchedule.event.desc, // 일정 설명 추가
        },
      });
    });

    // 변환된 모든 이벤트 배열 반환
    return events;
  };

  // 날짜 범위 선택 시 호출되는 핸들러
  const handleDateSelect = selectInfo => {
    // 선택된 날짜 범위 정보를 상태에 저장
    setSelectedDates({
      start: selectInfo.startStr, // 선택 범위의 시작 날짜
      end: selectInfo.endStr, // 선택 범위의 종료 날짜
      allDay: selectInfo.allDay, // 종일 일정 여부
    });
    // 일정 추가/편집 모달 창 열기
    setIsModalOpen(true);
    // 캘린더의 날짜 선택 상태 초기화
    selectInfo.view.calendar.unselect();
  };

  // 단일 날짜 클릭 시 호출되는 핸들러
  const handleDateClick = info => {
    setSelectedDates({
      start: info.dateStr,
      end: info.dateStr,
      allDay: info.allDay,
    });
    setIsModalOpen(true);
  };

  // 이벤트 클릭 시 호출되는 핸들러
  const handleEventClick = clickInfo => {
    // 클릭된 이벤트 객체 가져오기
    const event = clickInfo.event;
    // 선택된 이벤트를 상태에 저장
    setSelectedEvent(event);
    // 새 이벤트 데이터 상태 설정
    setNewEventData({
      // 이벤트 제목에서 시간 정보를 제거하고 저장
      title: event.title.split(" (")[0],
      // 이벤트의 설명 정보 저장
      description: event.extendedProps.description,
      // 이벤트의 배경색을 가져오거나 기본값 설정
      backgroundColor: event.backgroundColor || "#3788d8",
      // 이벤트 시작 시간이 있으면 시:분 형식으로 변환하여 저장
      time: event.start ? event.start.toTimeString().slice(0, 5) : "",
    });
    // 편집 모드로 설정
    setIsEditMode(true);
    // 모달 창 열기
    setIsModalOpen(true);
  };

  // 새 일정 추가 처리 핸들러
  const handleAddEvent = e => {
    // 폼 기본 제출 동작 방지
    e.preventDefault();

    // 새로운 일정 객체 생성
    const newEvent = {
      // 현재 시간을 기반으로 고유 ID 생성
      id: Date.now(),
      // 시간이 있는 경우 제목에 시간을 포함, 없으면 제목만 사용
      title: newEventData.time
        ? `${newEventData.title} (${newEventData.time})`
        : newEventData.title,
      // 시간이 있는 경우 날짜와 시간 조합, 없으면 날짜만 사용
      start: newEventData.time
        ? `${selectedDates.start}T${newEventData.time}`
        : selectedDates.start,
      // 종료 날짜 설정
      end: selectedDates.end,
      // 일정 배경색 설정
      backgroundColor: newEventData.backgroundColor,
      // 추가 속성으로 일정 설명 포함
      extendedProps: {
        description: newEventData.description,
      },
    };

    // 기존 일정 목록에 새 일정 추가
    setEvents([...events, newEvent]);
    // 모달 창 닫기
    setIsModalOpen(false);
    // 새 일정 입력 폼 초기화
    setNewEventData({
      title: "",
      description: "",
      backgroundColor: "#3788d8",
      time: "",
    });
  };

  // 일정 수정 처리 핸들러
  const handleUpdateEvent = e => {
    // 폼 기본 제출 동작 방지
    e.preventDefault();

    // events 배열을 순회하면서 선택된 이벤트만 업데이트
    const updatedEvents = events.map(event => {
      // 선택된 이벤트인 경우 업데이트된 정보로 변경
      if (event.id === selectedEvent.id) {
        return {
          ...event, // 기존 이벤트 속성 유지
          // 시간이 있는 경우 제목에 시간 포함, 없으면 제목만 사용
          title: newEventData.time
            ? `${newEventData.title} (${newEventData.time})`
            : newEventData.title,
          // 시간이 있는 경우 날짜와 시간 조합, 없으면 기존 시작일 사용
          start: newEventData.time
            ? `${selectedEvent.startStr.split("T")[0]}T${newEventData.time}`
            : selectedEvent.startStr,
          // 선택된 배경색으로 업데이트
          backgroundColor: newEventData.backgroundColor,
          // 일정 설명 업데이트
          extendedProps: {
            description: newEventData.description,
          },
        };
      }
      // 선택되지 않은 이벤트는 그대로 반환
      return event;
    });

    // 업데이트된 이벤트 목록으로 상태 갱신
    setEvents(updatedEvents);
    // 모달 창 닫기
    setIsModalOpen(false);
    // 편집 모드 해제
    setIsEditMode(false);
    // 선택된 이벤트 초기화
    setSelectedEvent(null);
    // 새 일정 입력 폼 초기화
    setNewEventData({
      title: "",
      description: "",
      backgroundColor: "#3788d8",
      time: "",
    });
  };

  // 일정 삭제 처리 핸들러
  const handleDeleteEvent = eventId => {
    // 사용자에게 일정 삭제 확인 요청
    if (window.confirm("이 일정을 삭제하시겠습니까?")) {
      // 선택된 일정을 제외한 나머지 일정들로 events 상태 업데이트
      setEvents(events.filter(event => event.id !== eventId));
      // 모달 창 닫기
      setIsModalOpen(false);
      // 편집 모드 해제
      setIsEditMode(false);
      // 선택된 이벤트 상태 초기화
      setSelectedEvent(null);
    }
  };

  // 컴포넌트 UI 렌더링
  return (
    <div style={{ width: "80%", height: "100%", margin: "0 auto" }}>
      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ color: "white" }}>Loading...</div>
        </div>
      )}

      {/* 에러 메시지 표시 */}
      {error && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#ff4444",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              marginLeft: "10px",
              border: "none",
              background: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* FullCalendar 컴포넌트 */}
      <FullCalendar
        // 캘린더에 필요한 플러그인들을 추가 (일간/주간/월간 보기, 상호작용)
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // 초기 캘린더 뷰를 월간으로 설정
        initialView="dayGridMonth"
        // 날짜 선택 가능하도록 설정
        selectable={true}
        // 캘린더에 표시할 이벤트 데이터
        events={events}
        // 날짜 범위 선택 시 실행될 핸들러
        select={handleDateSelect}
        // 날짜 클릭 시 실행될 핸들러
        dateClick={handleDateClick}
        // 이벤트 클릭 시 실행될 핸들러
        eventClick={handleEventClick}
        // 이벤트 시간 표시 형식 설정
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        // 캘린더 상단 툴바 구성 설정
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        // 업무 시간 표시 활성화
        businessHours={true}
        // 현재 시간 표시선 활성화
        nowIndicator={true}
        // 캘린더 높이를 컨텐츠에 맞게 자동 조정
        height="auto"
        // 한국어 로케일 설정
        locale="ko"
        // 이벤트가 캘린더에 마운트될 때 실행되는 콜백
        eventDidMount={info => {
          if (info.event.end) {
            info.el.style.borderRadius = "15px";
          }
        }}
        // 4. 드래그로 수정하기 가능하도록
        editable={true}
      />

      {/* 일정 추가/수정 모달 */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h2>{isEditMode ? "일정 수정" : "새 일정 추가"}</h2>
          <form onSubmit={isEditMode ? handleUpdateEvent : handleAddEvent}>
            {/* 일정 제목 입력 필드 */}
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="일정 제목"
                value={newEventData.title}
                onChange={e =>
                  setNewEventData({ ...newEventData, title: e.target.value })
                }
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
            </div>
            {/* 시간 입력 필드 */}
            <div style={{ marginBottom: "10px" }}>
              <input
                type="time"
                value={newEventData.time}
                onChange={e =>
                  setNewEventData({ ...newEventData, time: e.target.value })
                }
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
            </div>
            {/* 일정 설명 입력 필드 */}
            <div style={{ marginBottom: "10px" }}>
              <textarea
                placeholder="일정 설명"
                value={newEventData.description}
                onChange={e =>
                  setNewEventData({
                    ...newEventData,
                    description: e.target.value,
                  })
                }
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
            </div>
            {/* 배경색 선택 필드 */}
            <div style={{ marginBottom: "10px" }}>
              <input
                type="color"
                value={newEventData.backgroundColor}
                onChange={e =>
                  setNewEventData({
                    ...newEventData,
                    backgroundColor: e.target.value,
                  })
                }
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
            </div>
            {/* 버튼 그룹 */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              {/* 삭제 버튼 (수정 모드일 때만 표시) */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                  }}
                >
                  삭제
                </button>
              )}
              {/* 취소 버튼 */}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedEvent(null);
                  setNewEventData({
                    title: "",
                    description: "",
                    backgroundColor: "#3788d8",
                    time: "",
                  });
                }}
                style={{ padding: "8px 16px" }}
              >
                취소
              </button>
              {/* 추가/수정 버튼 */}
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#3788d8",
                  color: "white",
                  border: "none",
                }}
              >
                {isEditMode ? "수정" : "추가"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Full;
