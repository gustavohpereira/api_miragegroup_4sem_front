import { useState } from "react";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";

export default function NewRoom() {

  const [roomTypes, setRoomTypes] = useState([]);
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    capacity: 0,
    accessLevel: "",
  });

  const handleChange = (event, field) => {
    event.preventDefault();
    setRoomData({
      ...roomData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let endpoint = "http://localhost:8080/physicalRoom/create"
    if (roomTypes === `Virtual`) { 
      endpoint = "http://localhost:8080/virtualRoom/create"
    }
    
    let data = {
      name: roomData.name,
      login:`admin`,
      password:`admin`,
      accessLevel: roomData.accessLevel
    }
    if (roomTypes === `Fisica`) { 
      data = {
        name: roomData.name,
        accessLevel: roomData.accessLevel,
        location: roomData.description,
        occupancy: roomData.capacity,
        description: roomData.description
      }
    }

    console.log(data)
    try {
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log("Sala criada com sucesso");
        toast.success("Sala criada com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.log(response.status)
        console.log("Erro ao criar sala");
      }


      // Lógica adicional após a criação da sala, se necessário
    } catch (error) {
      console.error(error);
      // Tratamento de erro, se necessário
    }
  };

  return (
    <div className="w-full">
      <PageTitle>Cadastro de Sala</PageTitle>

      {/* Formulário de Cadastro de Sala */}
      <div className="w-full flex justify-center">
        <form
          className="p-4 mt-4 standardFlex w-5/6 flex-col gap-8"
          onSubmit={handleSubmit}
        >
          {/* Linha 1: Nome e Descrição */}
          <div className="w-full flex justify-between items-center gap-32">
            {/* Nome da Sala */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label htmlFor="roomName" className="text-2xl my-4">
                Nome da Sala
              </label>
              <input
                type="text"
                id="roomName"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                value={roomData.name}
                onChange={(e) => handleChange(e, "name")}
              />
            </div>

            {/* Descrição da Sala */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label htmlFor="description" className="text-2xl my-4">
                Descrição da Sala
              </label>
              <input
                type="text"
                id="description"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                value={roomData.description}
                onChange={(e) => handleChange(e, "description")}
              />
            </div>
          </div>

          {/* Linha 2: Nível de Acesso e Capacidade Máxima */}
          <div className="w-full flex justify-between items-center gap-32">
            {/* Nível de Acesso */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label htmlFor="accessLevel" className="text-2xl my-4">
                Nível de Acesso
              </label>
              <select
                id="accessLevel"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                value={roomData.accessLevel}
                onChange={(e) => handleChange(e, "accessLevel")}
              >
                <option value="">Selecione o nível de acesso</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Capacidade Máxima */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label htmlFor="capacity" className="text-2xl my-4">
                Capacidade Máxima
              </label>
              <input
                type="number"
                id="capacity"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                value={roomData.capacity}
                min={0}
                onChange={(e) => handleChange(e, "capacity")}
              />
            </div>


          </div>

          {/* Linha 3: Criação da categoria */}
          <div className="w-full flex justify-between items-center gap-32">

            <div className="flex flex-col items-start gap-8">
              <label className="text-2xl my-4">Categoria da Sala</label>
              <div className="flex gap-8">
                <button
                  type="button"
                  className={`border border-slate-400 ${roomTypes === `Fisica` ? "bg-[#F6A700] " : ""
                    } p-4 rounded-md`}
                  onClick={(e) => setRoomTypes(`Fisica`)}
                >
                  Fisica
                </button>
                <button
                  type="button"
                  className={`border border-slate-400 ${roomTypes === `Virtual` ? "bg-[#F6A700] " : ""
                    } p-4 rounded-md`}
                  onClick={(e) => setRoomTypes(`Virtual`)}
                >
                  Virtual
                </button>
              </div>


            </div>
          </div>

          {/* Botão de Criar Sala */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-md border border-slate-400 w-2/12"
            >
              Criar Sala
            </button>
          </div>

          {/* Container de Toast para mensagens */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </form>
      </div>
    </div>
  );
}
