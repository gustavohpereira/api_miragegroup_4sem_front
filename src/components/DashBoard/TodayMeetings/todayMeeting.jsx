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
    <div className="standardFlex items-start justify-start">
      <div className="w-[40%] px-4">
        <h1 className="text-4xl mb-10">Suas Reuniões</h1>
        <div className="gap-4 flex my-6">
          <select
            className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-md border border-slate-400"
            value={tipoReuniao}
            onChange={handleTipoReuniaoChange}
          >
            <option value="Todos">Todos</option>
            <option value={1}>Física</option>
            <option value={2}>Hibrida</option>
            <option value={3}>Virtual</option>
          </select>
        </div>
        <div className="standardFlex flex-col gap-4 justify-start">
          <MeetingCarousel meetings={filteredMeetings} />
        </div>
      </div>
      <Calendar meetingData={meetings} />
    </div>
  );
}
