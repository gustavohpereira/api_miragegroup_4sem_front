import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function RoomCard({ sala, showDelete }) {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async (id) => {
        try {
          const confirm = window.confirm(
            "Tem certeza que deseja excluir esta Sala?"
          );
          if (confirm) {
            const data = { id: id };
            await axios.delete(`http://localhost:8080/physicalRoom/delete`, {
              data: data,
            });
            setIsDeleted(true);
            toast.success("Sala deletada com sucesso", {
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
          console.error("Erro ao deletar Sala:", error);
        }
      };

    if (isDeleted) return null;
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
          {/* <button className="bg-[#FED353] hover:bg-[#F6A700] p-4 rounded-md border border-slate-400">
            <p>Entrar na Reunião</p>
          </button> */}
                    {/* {showUpdate == true && (
            
            <button
                className="bg-[#FED353] hover:bg-[#F6A700] p-4 rounded-md border border-slate-400"
                onClick={() => handleUpdate()}
              >
                <p>Atualizar Reunião</p>
              </button>
            )} */}
          {showDelete == true && (
            <button
              className="bg-red-400 hover:bg-red-500 p-4 rounded-md border border-slate-400"
              onClick={() => handleDelete(sala.id)}
            >
              <p>Excluir Reunião</p>
            </button>
          )}

          
        </div>
        </div>
    )
}