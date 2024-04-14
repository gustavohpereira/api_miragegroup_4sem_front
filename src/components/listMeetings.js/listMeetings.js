import React, { useEffect, useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import axios from "axios";

export default function ListMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [tipoReuniao, setTipoReuniao] = useState("Todos");

    const handleDelete = async (id) => {
      try {
        console.log("id", id);
        const data = { "id": id };
        await axios.delete(`http://localhost:8080/meeting/delete`, { data: data });
        setMeetings(meetings.filter((m) => m.id !== id));
      } catch (error) {
        console.error("Erro ao deletar reunião:", error);
      }
    };




  useEffect(() => {
    async function fetchMeetings() {
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
  console.log(tipoReuniao)
  const filteredMeetings = tipoReuniao === "Todos" ? meetings : meetings.filter((m) => m.meetingType == tipoReuniao);
  console.log(filteredMeetings)
  return (
    <div>
      <PageTitle>Reuniões</PageTitle>
      <div className="gap-4 flex my-8 ">
        <select
          className="bg-[#F6A700] p-3 rounded-md border border-slate-400 w-1/12"
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
            let  meetingType = ''
            if (m.meetingType === 1) {
              meetingType = 'Física'
            } else if (m.meetingType === 2) {
              meetingType = 'Hibrida'
            } else if (m.meetingType === 3) {
              meetingType = 'Virtual'
            }



          return (
            <div className="standardFlex border border-black rounded-lg items-center p-2 px-6 justify-between w-full" key={m.nome}>
              <div className="flex gap-16">
                <div className="">
                  <h1 className="text-3xl">{m.protocol}</h1>
                  <h2 className="text-xl font-light">{meetingType}</h2>
                </div>
                <div className="flex gap-8">
                <p className="text-xl font-light">Capacidade máxima: {m.meetingType == 1 || m.meetingType == 2 ? m.physicalRoom.occupancy : 'capacidade infinita'}</p>
                </div>

                <div className="flex gap-8">
                  <p className="text-xl font-light">{m.datetime}</p>
                  <p className="text-xl font-light">{m.meetingType}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <button className="bg-[#F6A700] p-4 rounded-md border border-slate-400">
                  <p>Entrar na Reunião</p>
                </button>
                <button className="bg-[#F6A700] p-4 rounded-md border border-slate-400" onClick={() => handleDelete(m.id)}>
                  <p>Excluir</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}