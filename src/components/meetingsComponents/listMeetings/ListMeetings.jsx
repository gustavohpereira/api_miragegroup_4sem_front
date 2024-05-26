import React, { useEffect, useState } from "react";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import MeetingCard from "../../Cards/MeetingCard";
import { useNavigate } from "react-router-dom";
import { getAllMeetings } from "../../../functions/meetingEndpoints";

export default function ListMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [tipoReuniao, setTipoReuniao] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMeetings() {
      const meetingsResponse = await getAllMeetings();
      console.log("response", meetingsResponse);
      setMeetings(meetingsResponse);
    }
    fetchMeetings();
  }, []);

  const createMeeting = () => {
    navigate("/createMeeting");
  };

  const handleTipoReuniaoChange = (event) => {
    setTipoReuniao(event.target.value);
  };
  const filteredMeetings =
    tipoReuniao === "Todos"
      ? meetings
      : meetings.filter((m) => m.meetingType == tipoReuniao);
  return (
    <div>
      <PageTitle>Reuniões</PageTitle>
      <div className="gap-4 flex my-8 justify-between items-center ">
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
        <button
          className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] py-3 px-0.5 rounded-md border border-slate-400 w-2/12"
          onClick={createMeeting}
        >
          Criar nova Reunião
        </button>
      </div>
      <div className="standardFlex flex-col gap-4 my-8 items-start ">
        {filteredMeetings.map((m) => {
          // Determinar se a reunião tem uma ATA anexada
          const showAta = m.ata_url ? false : true;
          const showDownloadAta = m.ata_url ? true : false;

          return (
            <MeetingCard
              m={m}
              key={m.id}
              showDelete={true}
              showUpdate={true}
              showJoin={true}
              showAta={showAta}
              showDownloadAta={showDownloadAta}
            />
          );
        })}
      </div>
    </div>
  );
}
