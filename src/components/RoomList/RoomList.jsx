import React, { useEffect, useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import axios from "axios";

export default function RoomList() {
  const [salas, setSalas] = useState([]);
  const [tipoReuniao, setTipoReuniao] = useState("Todos");

  useEffect(() => {
    async function fetchSalas() {
      try {
        const responseSalasFisicas = await axios.get("http://localhost:5000/physicalRoom/get");
        const responseSalasVirtuais = await axios.get("http://localhost:5000/virtualRoom/get");

        const responseSalasFisicasData = responseSalasFisicas.data.map((sala) => {
          return { ...sala, type: "Física" };
        });

        const responseSalasVirtuaisData = responseSalasVirtuais.data.map((sala) => {
          return { ...sala, type: "Virtual" };
        });

        const response = [...responseSalasFisicasData, ...responseSalasVirtuaisData];

        setSalas(response);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    }

    fetchSalas();
  }, []);

  const handleTipoReuniaoChange = (event) => {
    setTipoReuniao(event.target.value);
  };

  const filteredSalas = tipoReuniao === "Todos" ? salas : salas.filter((sala) => sala.type === tipoReuniao);

  return (
    <div>
      <PageTitle>Salas</PageTitle>
      <div className="gap-4 flex my-8 ">
        <select
          className="bg-[#F6A700] p-3 rounded-md border border-slate-400 w-1/12"
          value={tipoReuniao}
          onChange={handleTipoReuniaoChange}
        >
          <option value="Todos">Todos</option>
          <option value="Física">Física</option>
          <option value="Virtual">Virtual</option>
        </select>
        <button className="bg-[#F6A700] p-3 rounded-md border border-slate-400 w-1/13">Data</button>
        <button className="bg-[#F6A700] p-3 rounded-md border border-slate-400 w-2/12">Estado de locação</button>
      </div>
      <div className="flex flex-col gap-4 my-8 ">
        {filteredSalas.map((sala) => {
          return (
            <div className="standardFlex border border-black rounded-lg items-center p-2 px-6 justify-between w-full" key={sala.nome}>
              <div className="flex gap-4">
                <div className="">
                  <h1 className="text-3xl">{sala.location}</h1>
                  <p className="text-2xl font-light">Capacidade máxima: {sala.occupancy}</p>
                </div>
                <div className="flex gap-8">
                  <p>{sala.dataMarcada}</p>
                  <p>{sala.type}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <button className="bg-[#F6A700] p-4 rounded-md border border-slate-400">
                  <p>Entrar na sala</p>
                </button>
                <button className="bg-[#F6A700] p-4 rounded-md border border-slate-400">
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