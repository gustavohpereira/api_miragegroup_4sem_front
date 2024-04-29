import React, { useEffect, useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RoomList() {
  const [salas, setSalas] = useState([]);
  const [tipoReuniao, setTipoReuniao] = useState("Todos");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchSalas() {
      try {
        const responseSalasFisicas = await axios.get("http://localhost:8080/physicalRoom/get");
        const responseSalasVirtuais = await axios.get("http://localhost:8080/virtualRoom/get");

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

  const createRoom = () => {
    navigate("/createRoom");
  };

  const filteredSalas = tipoReuniao === "Todos" ? salas : salas.filter((sala) => sala.type === tipoReuniao);

  return (
    <div>
      <PageTitle>Salas</PageTitle>
      <div className="gap-4 flex my-8 justify-between	">
        <select
          className="bg-[#FED353] hover:bg-[#F6A700] p-3 rounded-md border border-slate-400 w-1/12"
          value={tipoReuniao}
          onChange={handleTipoReuniaoChange}
        >
          <option value="Todos">Todos</option>
          <option value="Física">Física</option>
          <option value="Virtual">Virtual</option>
        </select>
        <button
          className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] py-3 px-0.5 rounded-md border border-slate-400 w-2/12"
          onClick={createRoom}
        >
          Criar nova Sala
        </button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}