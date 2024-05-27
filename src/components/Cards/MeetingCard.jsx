import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MeetingCard({ m, showDelete, showUpdate, showJoin, showAta, showDownloadAta }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

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
      console.error("Erro ao deletar reunião:", error);
      toast.error("Erro ao deletar reunião");
    }
  };

  const handleUpdate = () => {
    navigate("/updateMeeting/" + m.id);
  };

  const handleAta = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = (event) => handleFileChange(event.target.files[0]);
    input.click();
  };

  const handleDownload = () => {
    if (m.ata_url) {
      window.location.href = m.ata_url;
    } else {
      toast.error("URL de ATA não disponível", {
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
  }
  const uploadAtaToBackend = async (meetingId, file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`http://localhost:8080/meeting/${meetingId}/uploadata`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Arquivo da ata enviado com sucesso!");
        return true;
      } else {
        console.error("Erro ao enviar arquivo da ata:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo da ata:", error);
      return false;
    }
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    const isSuccess = await uploadAtaToBackend(m.id, file);
    if (isSuccess) {
      toast.success("Arquivo da ata enviado com sucesso!");
    } else {
      toast.error("Erro ao enviar arquivo da ata. Por favor, tente novamente.");
    }
  };

  const handleJoinMeeting = () => {
    if (m.join_url) {
      window.location.href = m.join_url;
    } else {
      toast.error("URL de entrada na reunião não disponível", {
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
  };

  let location = null;
  let meetingType = "";

  if (m.meetingType == 1 || m.meetingType == 2) {
    meetingType = m.meetingType == 1 ? "Presencial" : "Hibrida";
    if (m.physicalRoom) {
      location = (
        <div>
          <strong>Local:</strong> {m.physicalRoom.location}
        </div>
      );
    }
  } else {
    meetingType = "Virtual";
  }

  if (isDeleted) {
    return null;
  } else {
    return (
      <div
        className="standardFlex border border-gray-300 shadow-lg bg-white items-center p-4 px-4 justify-between gap-4 min-w-[75%]"
        key={m.nome}
      >
        <div className="standardFlex flex-col justify-start items-start gap-2">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold mb-2">{m.topic}</h1>
            <p className="text-lg font-light">
              <strong>Tipo de reunião:</strong> {meetingType}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-light">
              <strong>Capacidade máxima:</strong>{" "}
              {(m.meetingType === 1 || m.meetingType === 2) && m.physicalRoom
                ? m.physicalRoom.occupancy
                : "livre"}
            </span>
            <div className="text-lg font-light">{location}</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-lg font-light">
              <strong>Data:</strong>{" "}
              {format(new Date(m.beginning_time), "dd/MM/yyyy")}
            </p>
            <p className="text-lg font-light">
              <strong>Hora:</strong>{" "}
              {format(new Date(m.beginning_time), "HH:mm")} -{" "}
              {format(new Date(m.end_time), "HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-center w-1/2">
          {showJoin && m.join_url && (
            <button
              className="bg-[#FED353] hover:bg-[#F6A700] transition px-4 py-2 rounded-md text-base mt-auto"
              onClick={handleJoinMeeting}
            >
              <p>Entrar na Reunião</p>
            </button>
          )}
          {showUpdate && (
            <button
              className="bg-[#FED353] hover:bg-[#F6A700] transition px-4 py-2 rounded-md text-base mt-auto"
              onClick={handleUpdate}
            >
              <p>Atualizar Reunião</p>
            </button>
          )}
          {showAta && (
            <button
              className="bg-[#FED353] hover:bg-[#F6A700] transition px-4 py-2 rounded-md text-base mt-auto"
              onClick={handleAta}
            >
              <p>Anexar ATA</p>
            </button>
          )}
          {showDownloadAta && (
            <button
              className="bg-[#FED353] hover:bg-[#F6A700] transition px-4 py-2 rounded-md text-base mt-auto"
              onClick={handleDownload}
            >
              <p>Baixar ATA</p>
            </button>
          )}
          {showDelete && (
            <button
              className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md"
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
