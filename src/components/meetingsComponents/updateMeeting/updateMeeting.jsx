import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import PageTitle from "../../pageTitle/PageTitle";

export default function UpdateMeeting() {
  const { meetingId } = useParams();
  const [title , setTitle] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [physicalRoom, setPhysicalRoom] = useState(null);
  const [virtualRoom, setVirtualRoom] = useState(null);
  const [protocol, setProtocol] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [meetingType, setMeetingType] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [users, setUsers] = useState([]);
  const [salas, setSalas] = useState([]);
  const [singlePauta, setSinglePauta] = useState("");
  const [pautas, setPautas] = useState([]);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const responseSalasFisicas = await axios.get(
          "http://localhost:8080/physicalRoom/get"
        );
        const responseSalasVirtuais = await axios.get(
          "http://localhost:8080/virtualRoom/get"
        );

        const responseSalasFisicasData = responseSalasFisicas.data.map(
          (sala) => {
            return { ...sala, type: "Fisica" };
          }
        );

        const responseSalasVirtuaisData = responseSalasVirtuais.data.map(
          (sala) => {
            return { ...sala, type: "Virtual" };
          }
        );

        const response = [
          ...responseSalasFisicasData,
          ...responseSalasVirtuaisData,
        ];

        setSalas(response);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    }
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/meeting/get/${meetingId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const {
          participants,
          physicalRoom,
          virtualRoom,
          protocol,
          datetime,
          description,
          meetingType,
          meetingTheme,
        } = userResponse.data;

    const dateParts = datetime.split('T')[0].split('-');
    const timeParts = datetime.split('T')[1].split(':');
  
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Mês é baseado em zero (0-11)
    const day = parseInt(dateParts[2], 10);
  
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
  
    const formattedDatetime = new Date(year, month, day, hours, minutes).toISOString().slice(0, -1)


        setTitle(protocol);
        setSelectedUsers(participants);
        setPhysicalRoom(physicalRoom);
        setVirtualRoom(virtualRoom);
        setProtocol(protocol);
        setDatetime(formattedDatetime);
        setDescription(description);
        setMeetingType(meetingType);
        setPautas(meetingTheme);

        handleCategoryChange(meetingType);
        setPautas(meetingTheme);
      } catch (error) {
        console.error("Erro ao obter perfil do usuário:", error);
      }
    };

    fetchSalas();
    fetchData();
    
    setLoaded(true);
  }, []);

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/user/fetchall").then((response) => {
        const data = response.data;
        setUsers(data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        protocol: protocol,
        description: description,
        datetime: datetime,
        physicalRoom: physicalRoom,
        virtualRoom: virtualRoom,
        meetingType: selectedCategory,
        participants: selectedUsers,
        meetingTheme: pautas,
      };
      const response = await axios.patch(
        `http://localhost:8080/meeting/update/${meetingId}`,
        requestData,
        { withCredentials: true }
      );
      toast.success("Reunião atualizada com sucesso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar reunião:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 1) {
      setVirtualRoom(null);
    } else if (category === 3) {
      setPhysicalRoom(null);
    }
  };

  const handleRoomSelection = (id) => {
    
    if (id === "replacePhysicalRoom") {
      setPhysicalRoom(null);
    } else if (id === "replaceVirtualRoom") {
      setVirtualRoom(null);
    } else {
      if (salas && salas.length > 0) {
        const selectedRoom = salas.find((sala) => sala.id == id);
        if (selectedRoom) {
          if (selectedRoom.type === "Fisica") {
            setPhysicalRoom(selectedRoom);
          } else {
            
            setVirtualRoom(selectedRoom);
          }
        }
      } else {
      }
    }
  };
  const handleUserSelection = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user.id == selectedUserId);

    if (
      selectedUser &&
      !selectedUsers.some((user) => user.id == selectedUserId)
    ) {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleRemoveUser = (userId) => {
    const newSelectedUsers = selectedUsers.filter((user) => user.id !== userId);
    setSelectedUsers(newSelectedUsers);
  };

  const handlePautaDelete = (index) => {
    const newPautas = [...pautas];
    newPautas.splice(index, 1);
    setPautas(newPautas);
  };

  if (!loaded) {
    return null;
  }

    return (
    <div>
      <div className="w-full ">
        <PageTitle>Atualizar reunião: {title}</PageTitle>

        {/* Formulário de Nova Reunião */}
        <div className="w-full flex justify-center">
          <form
            className="p-4 mt-4 standardFlex w-5/6 flex-col gap-8"
            onSubmit={handleSubmit}
          >
            {/* PRIMEIRA LINHA */}
            <div className="w-full flex justify-between items-center gap-32">
              {/* TÍTULO DA REUNIÃO */}
              <div className="standardFlex flex-col w-2/5 lg:items-start">
                <label htmlFor="meetingName" className="text-2xl my-4">
                  Título da Reunião
                </label>
                <input
                  type="text"
                  id="meetingName"
                  value={protocol}
                  className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                  onChange={(e) => setProtocol(e.target.value)}
                />
              </div>

              {/* CATEGORIA DA REUNIÃO */}
              <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                <label className="text-2xl my-4">Categoria da reunião</label>
                <div className="flex gap-8">
                  <button
                    type="button"
                    className={`border border-slate-400 ${
                      selectedCategory === 1 ? "bg-[#F6A700]" : ""
                    } p-4 rounded-md`}
                    onClick={() => handleCategoryChange(1)}
                  >
                    Presencial
                  </button>
                  <button
                    type="button"
                    className={`border border-slate-400 ${
                      selectedCategory === 2 ? "bg-[#F6A700]" : ""
                    } p-4 rounded-md`}
                    onClick={() => handleCategoryChange(2)}
                  >
                    Hibrido
                  </button>
                  <button
                    type="button"
                    className={`border border-slate-400 ${
                      selectedCategory === 3 ? "bg-[#F6A700]" : ""
                    } p-4 rounded-md`}
                    onClick={() => handleCategoryChange(3)}
                  >
                    Virtual
                  </button>
                </div>
              </div>
            </div>
            {/* SEGUNDA LINHA */}
            <div className="w-full flex justify-between items-center gap-32">
              {/* DATA DA REUNIÃO */}
              <div className="standardFlex flex-col items-center lg:items-start w-2/5 ">
                <label htmlFor="Data" className="text-2xl my-4">
                  Data
                </label>
                <input
                  type="datetime-local"
                  id="Data"
                  value={datetime}
                  className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </div>

              {/* DESCRIÇÃO DA REUNIÃO */}
              <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                <label htmlFor="description" className="text-2xl my-4">
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* TERCEIRA LINHA */}
            <div
              className={`w-full flex ${
                selectedCategory === 2 ? "justify-between" : "justify-start"
              } items-center gap-32`}
            >
              {selectedCategory === 1 || selectedCategory === 2 ? (
                <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                  <label className="text-2xl my-4">Sala Física</label>
                  <select
                    className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                    onChange={(e) => handleRoomSelection(e.target.value)}
                    value={
                      physicalRoom ? physicalRoom.id : "replacePhysicalRoom"
                    }
                  >
                    <option value="replacePhysicalRoom">Sala física</option>
                    {salas &&
                      salas.length > 0 &&
                      salas
                        .filter((sala) => sala.type === "Virtual")
                        .map((sala) => (
                          <option key={sala.id} value={sala.id}>
                            {sala.id}
                          </option>
                        ))}
                  </select>
                </div>
              ) : null}

              {/* SALA VIRTUAL */}
              {selectedCategory === 3 || selectedCategory === 2 ? (
                <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                  <label className="text-2xl my-4">Sala Virtual</label>
                  <select
                    className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                    onChange={(e) => handleRoomSelection(e.target.value)}
                    value={virtualRoom ? virtualRoom.id : "replaceVirtualRoom"}
                  >
                    <option value="replaceVirtualRoom">Sala Virtual</option>
                    {salas
                      .filter((sala) => sala.type === "Virtual")
                      .map((sala) => (
                        <option key={sala.id} value={sala.id}>
                          {sala.id}
                        </option>
                      ))}
                  </select>
                </div>
              ) : null}
            </div>
            {/* QUARTA LINHA */}
            <div className="w-full flex justify-between items-center gap-12 min-h-40">
              {/* USUÁRIO */}
              <div className="standardFlex flex-col items-center lg:items-start w-2/5 min-h-40">
                <label className="text-2xl my-4">
                  Adicionar usuários à reunião
                </label>
                <select
                  className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                  onChange={handleUserSelection}
                >
                  <option value="">Adicione um novo usuário</option>
                  {users.map((user) => (
                    <option key={user.email} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-4 w-full">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex border p-2 gap-4 justify-between rounded-lg my-2"
                    >
                      <p>{user.name}</p>
                      <button onClick={() => handleRemoveUser(user.id)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* PAUTAS DA REUNIÃO */}
              <div className="standardFlex flex-col items-center lg:items-start w-2/5 min-h-40">
                <label className="text-2xl my-4">
                  Adicionar pautas à reunião
                </label>
                <div className="w-full flex gap-4">
                  <input
                    placeholder="Escreva uma pauta"
                    type="text"
                    id="pautas"
                    className="w-full lg:w-full p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                    onChange={(e) => setSinglePauta(e.target.value)}
                    value={singlePauta}
                  />
                  <button
                    type="button"
                    onClick={() => setPautas([...pautas, singlePauta])}
                    className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-full border border-slate-400"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex gap-4 w-full">
                  {pautas.map((pauta, index) => (
                    <div
                      key={index}
                      className="flex border p-2 gap-4 justify-between rounded-lg my-2"
                    >
                      <p>{pauta}</p>
                      <button type="button" onClick={() => handlePautaDelete(index)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 w-full flex lg:justify-end">
              <button
                type="submit"
                className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-md border border-slate-400 w-2/12"
              >
                Atualizar
              </button>
            </div>
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
    </div>
  );
}
