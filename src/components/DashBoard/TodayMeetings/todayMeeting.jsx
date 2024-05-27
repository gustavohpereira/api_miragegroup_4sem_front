import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import MeetingCard from "../../Cards/MeetingCard";
import Calendar from "../../calendar/calendar";
import { getMeetingsByUser } from "../../../functions/meetingEndpoints";
import MeetingCarousel from "../../carousel/MeetingCarousel";

export default function TodayMeeting() {
  const [meetings, setMeetings] = useState([]);
  const [todayMeetings, setTodayMeetings] = useState([]);
  const [tipoReuniao, setTipoReuniao] = useState("Todos");
  const user = useAuth();

  const handleTipoReuniaoChange = (event) => {
    setTipoReuniao(event.target.value);
  };

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await getMeetingsByUser(user.user.id);
        const todayMeetings = response.filter((meeting) => {
          const meetingDate = new Date(meeting.beginning_time);
          const today = new Date();
          return (
            meetingDate.getDate() === today.getDate() &&
            meetingDate.getMonth() === today.getMonth() &&
            meetingDate.getFullYear() === today.getFullYear()
          );
        });
        setMeetings(response);
        setTodayMeetings(todayMeetings);
      } catch (error) {
        console.error("Erro ao buscar reuniões:", error);
      }
    }
    if (user.user.id) {
      fetchMeetings();
    }
  }, [user.user.id]);

  if (meetings.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredMeetings = meetings.filter((m) => {
    if (tipoReuniao === "Todos") {
      return true;
    } else {
      return m.meetingType == tipoReuniao;
    }
  });

  return (
    <div className="standardFlex  h-full w-full">
      <div className="w-2/5 px-4 ">
        <h1 className="text-4xl font-light mb-10">Suas Reuniões</h1>
        <div className="gap-4 flex my-">
          <select
            className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] mb-5 p-3 rounded-md text-base"
            value={tipoReuniao}
            onChange={handleTipoReuniaoChange}
          >
            <option value="Todos">Todos</option>
            <option value={1}>Física</option>
            <option value={2}>Hibrida</option>
            <option value={3}>Virtual</option>
          </select>
        </div>
        <div className="standardFlex flex-col w-[50rem]">
          <MeetingCarousel meetings={filteredMeetings} />
        </div>
      </div>
      <div className="w-3/5 h-full ml-[13rem]">
        <Calendar meetingData={meetings} />
      </div>
    </div >
  );
}
