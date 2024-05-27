import React, { useEffect, useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RoomCard from "../Cards/roomCard";


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
          className="bg-[#FED353] hover:bg-[#F6A700] p-3 rounded-md w-28"
          value={tipoReuniao}
          onChange={handleTipoReuniaoChange}
        >
          <option value="Todos">Todos</option>
          <option value="Física">Física</option>
          <option value="Virtual">Virtual</option>
        </select>
        <button
          className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] py-3 px-0.5 rounded-md  w-2/12"
          onClick={createRoom}
        >
          Criar nova Sala
        </button>
      </div>
      <div className=" standardFlex flex-col gap-4 my-8 items-start ">
        {filteredSalas.map((sala) => {
          return (
            <RoomCard sala={sala} showDelete={true} key={sala.id}></RoomCard>
          );
        })}
      </div>
    </div>
  );
}