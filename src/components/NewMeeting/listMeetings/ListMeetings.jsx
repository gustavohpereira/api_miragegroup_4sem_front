import React, { useEffect, useState } from "react";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import MeetingCard from "../../Cards/MeetingCard";

export default function ListMeetings () {
    const [meetings, setMeetings] = useState([]);
    const [tipoReuniao, setTipoReuniao] = useState("Todos");



    useEffect(() => {
        async function fetchMeetings () {
            try {
                const response = await axios.get("http://localhost:8080/meeting/get");
                setMeetings(response.data);
            } catch (error) {
                console.error("Erro ao buscar salas:", error);
            }
        }
        fetchMeetings();
    }, []);

    const handleTipoReuniaoChange = (event) => {
        setTipoReuniao(event.target.value);
    };
    console.log(tipoReuniao);
    const filteredMeetings =
        tipoReuniao === "Todos"
            ? meetings
            : meetings.filter((m) => m.meetingType == tipoReuniao);
    console.log(filteredMeetings);
    return (
        <div>
            <PageTitle>Reuniões</PageTitle>
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
            <div className="flex flex-col gap-4 my-8 ">
                {filteredMeetings.map((m) => {
                    return <MeetingCard m={m} showDelete={true} />;
                })}
            </div>
        </div>
    );
}
