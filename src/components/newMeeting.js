import { useEffect, useState } from "react";
import PageTitle from "./pageTitle/PageTitle";
import axios from "axios";

export default function NewMeeting() {
  const [meetingData, setMeetingData] = useState({
    selectedUsers: [],
    physicalRoom: null,
    virtualRoom: null,
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dev",
      email: "dev@email.com",
      role: 4,
      access_level: 4,
    },
  ]);
  const [salas, setSalas] = useState([]);

  //   PEGAR AS SALAS
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
    console.log("salas", salas);
    fetchSalas();
  }, []);

  const handleChange = (event, dictKey, value) => {
    event.preventDefault();
    setMeetingData({
      ...meetingData,
      [dictKey]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Montando o objeto de dados para enviar na requisição

    console.log("mmetingData", meetingData);
    const requestData = {
      protocol: meetingData.protocol, // Substitua por como você está definindo o protocolo
      datetime: meetingData.datetime, // Substitua por como você está definindo a data e hora
      meetingType: selectedCategory, // Substitua por como você está definindo o tipo de reunião
      physicalRoom: meetingData.physicalRoom,
      virtualRoom: meetingData.virtualRoom,
      participants: meetingData.selectedUsers, // Obtendo os IDs dos participantes selecionados
    };
    console.log("data", requestData);
    axios
      .post("http://localhost:8080/meeting/create", requestData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response.data);
        // Lógica adicional após a criação da reunião, se necessário
      })
      .catch((error) => {
        console.error(error);
        // Tratamento de erro, se necessário
      });
  };

  const handleRoomSelection = (id) => {
    if (id == "replacePhysicalRoom") {
      console.log("replacePhysicalRoom");
      setMeetingData({
        ...meetingData,
        physicalRoom: null,
      });
      return;
    } else if (id == "replaceVirtualRoom") {
      console.log("replaceVirtualRoom");
      setMeetingData({
        ...meetingData,
        virtualRoom: null,
      });
      return;
    }

    const selectedRoom = salas.find((sala) => sala.id == id);
    console.log("selectedRoom", selectedRoom);
    if (selectedRoom) {
      if (selectedRoom.type == "Fisica") {
        console.log("Room selected:", selectedRoom);
        setMeetingData({
          ...meetingData,
          physicalRoom: selectedRoom,
        });
      } else {
        console.log("Virtual Room selected:", selectedRoom);
        setMeetingData({
          ...meetingData,
          virtualRoom: selectedRoom,
        });
      }
    } else {
      console.log("Room not found");
    }
  };

  const handleUserSelection = (event) => {
    const selectedUser = users.find((user) => user.id == event.target.value);

    if (
      selectedUser &&
      !meetingData.selectedUsers.some((user) => user.id === selectedUser.id)
    ) {
      const newSelectedUsers = [...meetingData.selectedUsers, selectedUser];

      setMeetingData({
        ...meetingData,
        selectedUsers: newSelectedUsers,
      });

      console.log(meetingData.selectedUsers);
    } else {
      console.log(meetingData.selectedUsers);
      console.log("User already selected");
    }
  };

  function handleRemoveUser(userId) {
    const newSelectedUsers = meetingData.selectedUsers.filter(
      (user) => user.id !== userId
    );

    setMeetingData({
      ...meetingData,
      selectedUsers: newSelectedUsers,
    });
  }


  function handleCategoryChange(category){
    if(category == 1){
      handleRoomSelection("replaceVirtualRoom")
    }else if (category == 3){
      handleRoomSelection("replacePhysicalRoom")
    }
    setSelectedCategory(category)
  }

  return (
    <div className="w-full ">
      {/* <div className=" w-full standardFlex justify-end p-4 gap-6">
        <div className=" p-3 rounded-full border border-black h-16 w-16 bg-[#D9D9D9]">
          <img src="new_meeting_logo.svg" alt=""></img>
        </div>
        <div className=" p-3 rounded-full border border-black h-16 w-16 bg-[#D9D9D9]">
          <img src="new_meeting_logo.svg" alt=""></img>
        </div>
      </div> */}

      <PageTitle>Nova Reunião</PageTitle>

      {/* New Meeting Form */}
      <div>
        <form
          className="p-4 mt-4 standardFlex  w-full flex-col gap-8  "
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* TITULO DA REUNIÃO */}
          <div className="standardFlex flex-col w-full items-center lg:items-start">
            <label htmlFor="meetingName" className="text-2xl my-2">
              Título da Reunião
            </label>
            <input
              type="text"
              id="meetingName"
              className="w-full lg:w-1/2  p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
              onChange={(e) => handleChange(e, "protocol", e.target.value)}
            ></input>
          </div>

          {/* CATEGORIA DA REUNIÃO */}
          <div className="standardFlex flex-col items-center lg:items-start">
            <label className="text-2xl my-4">Categoria da reunião</label>
            <div className="flex gap-8">
              <button
                type="button"
                className={`border border-slate-400 ${
                  selectedCategory === 1 ? "bg-[#F6A700] " : ""
                } p-4 rounded-md`}
                onClick={(e) => handleCategoryChange(1)}
              >
                Presencial
              </button>
              <button
                type="button"
                className={`border border-slate-400 ${
                  selectedCategory === 2 ? "bg-[#F6A700] " : ""
                } p-4 rounded-md`}
                onClick={(e) => handleCategoryChange(2)}
              >
                Hibrido
              </button>
              <button
                type="button"
                className={`border border-slate-400 ${
                  selectedCategory === 3 ? "bg-[#F6A700] " : ""
                } p-4 rounded-md`}
                onClick={(e) => handleCategoryChange(3)}
              >
                Virtual
              </button>
            </div>
          </div>

          {/* DATA DA REUNIÃO */}
          <div className="standardFlex flex-col items-center lg:items-start ">
            <label htmlFor="Data" className="text-2xl my-4">
              Data
            </label>
            <input
              type="datetime-local"
              id="Data"
              className="w-full lg:w-1/2 p-2 border focus:border-black rounded-md bg-[#D9D9D9]"
              onChange={(e) => handleChange(e, "datetime", e.target.value)}
            ></input>
          </div>

          {/* DESCRICAO DA REUNIÃO */}
          <div className="standardFlex flex-col items-center lg:items-start">
            <label htmlFor="description" className="text-2xl my-4">
              Descricão
            </label>
            <input
              type="text"
              id="description"
              className="w-full lg:w-1/2 p-2 border focus:border-black rounded-md bg-[#D9D9D9]"
              onChange={(e) => handleChange(e, "description", e.target.value)}
            ></input>
          </div>

          {/* SALA FISICA */}

          {selectedCategory == 1 || selectedCategory == 2 ? (
            <div className="standardFlex flex-col items-center lg:items-start">
              <label className="text-2xl my-2">Sala Fisica</label>
              <select
                className="w-full lg:w-1/2 p-2 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleRoomSelection(e.target.value)}
              >
                <option value="replacePhysicalRoom">Sala fisica</option>
                {salas
                  .filter((sala) => sala.type === "Fisica")
                  .map((sala) => (
                    <option key={sala} value={sala.id}>
                      {sala.location}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            null
          )}

          {/* SALA VIRTUAL */}
          {selectedCategory == 3 || selectedCategory == 2 ? (
            <div className="standardFlex flex-col items-center lg:items-start">
              <label className="text-2xl my-1">Sala Virtual</label>
              <select
                className="w-full lg:w-1/2 p-2 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleRoomSelection(e.target.value)}
              >
                <option value="replaceVirtualRoom">Sala Virtual</option>
                {salas
                  .filter((sala) => sala.type === "Virtual")
                  .map((sala) => (
                    <option key={sala} value={sala.id}>
                      {sala.id}
                    </option>
                  ))}
              </select>
            </div>
          ) : null}

          {/* USUARIO */}
          <div className="standardFlex flex-col items-center lg:items-start">
            <label className="text-2xl my-1">Adicionar usuario a reunião</label>
            <select
              className="w-full lg:w-1/2 p-2 border focus:border-black rounded-md bg-[#D9D9D9]"
              onChange={handleUserSelection}
            >
              <option value="">Adicione um novo usuario Usuário</option>
              {users.map((user) => (
                <option key={user.email} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="flex gap-4 w-full">
              {meetingData.selectedUsers.length > 0
                ? meetingData.selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex border p-2 w-1/12 justify-between rounded-lg my-2"
                    >
                      <p>{user.name}</p>
                      <button onClick={() => handleRemoveUser(user.id)}>
                        X
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="mt-8 w-full lg:w-1/2 flex lg:justify-end justify-center ">
            <button
              type="submit"
              className="bg-[#F6A700] p-4 rounded-md w-4/12 border border-slate-400"
            >
              criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
