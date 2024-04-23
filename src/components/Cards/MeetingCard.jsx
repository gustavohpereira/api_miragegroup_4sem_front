import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function MeetingCard({ m, showDelete,showUpdate }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Tem certeza que deseja excluir esta reunião?"
      );
      if (confirm) {
        const data = { id: id };
        await axios.delete(`http://localhost:8080/meeting/delete`, {
          data: data,
        });
        setIsDeleted(true);
        toast.success("Reunião deletada com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Erro ao deletar reunião:", error);
    }
  };

  function handleUpdate(){
    navigate("/updateMeeting/" + m.id);
  }

  var location = "";

  var meetingType = "";

  if (m.meetingType == 1) {
    meetingType = "Fisica";
    location = "Local: " + m.physicalRoom.location;
  } else if (m.meetingType == 2) {
    meetingType = "Hibrida";
    location = "Local: " + m.physicalRoom.location;
  } else {
    meetingType = "Virtual";
  }

  if (isDeleted) {
    return null;
  } else {
    return (
      <div
        className="standardFlex border border-black rounded-lg items-center p-2 px-6 justify-between w-full"
        key={m.nome}
      >
        
        <div className="flex justify-start gap-4">
          <div className=" min-w-96 max-w-96">
            <h1 className="text-2xl ">{m.protocol}</h1>
            <p className="text-lg font-light">Tipo de reunião: {meetingType}</p>
          </div>
          <div className="flex flex-col   min-w-96 max-w-min-w-96">
            <p className="text-lg font-light">
              Capacidade máxima:{" "}
              {m.meetingType == 1 || m.meetingType == 2
                ? m.physicalRoom.occupancy
                : "livre"}
            </p>
            <p className="text-lg font-light">{location}</p>
          </div>

          <div className="flex gap-8">
            <p className="text-lg font-light">
              {format(new Date(m.datetime), "dd/MM/yyyy HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          {/* <button className="bg-[#FED353] hover:bg-[#F6A700] p-4 rounded-md border border-slate-400">
            <p>Entrar na Reunião</p>
          </button> */}
                    {showUpdate == true && (
            
            <button
                className="bg-[#FED353] hover:bg-[#F6A700] p-4 rounded-md border border-slate-400"
                onClick={() => handleUpdate()}
              >
                <p>Atualizar Reunião</p>
              </button>
            )}
          {showDelete == true && (
            <button
              className="bg-red-400 hover:bg-red-500 p-4 rounded-md border border-slate-400"
              onClick={() => handleDelete(m.id)}
            >
              <p>Excluir Reunião</p>
            </button>
          )}

          
        </div>
      </div>
    );
  }
}
