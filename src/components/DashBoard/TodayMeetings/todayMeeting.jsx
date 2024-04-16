import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import MeetingCard from "../../Cards/MeetingCard";
export default function TodayMeeting () {
    const [meetings, setMeetings] = useState([]);
    const [todayMeetings, setTodayMeetings] = useState([]);
    const [tipoReuniao, setTipoReuniao] = useState("Todos");
    const user = useAuth();


    const handleTipoReuniaoChange = (event) => {
        setTipoReuniao(event.target.value);
    };

    useEffect(() => {
        async function fetchMeetings () {
            try {
                const response = await axios.get("http://localhost:8080/meeting/get");
                console.log("fetchMeetings", response.data);

                const todayMeetings = response.data.filter((meeting) => {
                    const meetingDate = new Date(meeting.datetime);
                    const today = new Date();
                    return (
                        meetingDate.getDate() === today.getDate() &&
                        meetingDate.getMonth() === today.getMonth() &&
                        meetingDate.getFullYear() === today.getFullYear()
                    );
                });

                setMeetings(response.data);
                setTodayMeetings(todayMeetings);
            } catch (error) {
                console.error("Erro ao buscar salas:", error);
            }
        }
        fetchMeetings();
    }, []);

    return (
        <div>
            <h1 className="text-4xl mb-10">Reuniões de hoje</h1>

            <div className="flex flex-col gap-4">
                {todayMeetings.filter((m) =>
                        m.participants.some(
                            (participant) => participant.id === user.user.id
                        )
                    ).map((m) => (
                    <MeetingCard key={m.id} m={m} showDelete={false} />
                ))}
            </div>
            <h1 className="text-4xl my-10">Suas Reuniões</h1>
            <div className="gap-4 flex my-8 ">
                <select
                    className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-md border border-slate-400 w-1/12"
                    value={tipoReuniao}
                    onChange={handleTipoReuniaoChange}
                >
                    <option value="Todos">Todos</option>
                    <option value={1}>Física</option>
                    <option value={2}>Hibrida</option>
                    <option value={3}>Virtual</option>
                </select>
            </div>
            <div className="flex flex-col gap-4">
                {meetings
                    .filter((m) =>
                        m.participants.some(
                            (participant) => participant.id === user.user.id
                        )
                    ).filter(
                        (m) => {
                            if (tipoReuniao === "Todos") {
                                return true
                            } else if (m.meetingType == tipoReuniao) {
                                return true
                            }
                        }
                    )
                    .map((m) => (
                        <MeetingCard key={m.id} m={m} showDelete={false} />
                    ))}
            </div>
        </div>
    );
}
