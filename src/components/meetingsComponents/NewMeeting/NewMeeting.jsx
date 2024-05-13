import { useEffect, useState } from "react";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { formatISO } from "date-fns";

export default function NewMeeting() {
  const accessToken = localStorage.getItem("accessToken");
  const [meetingData, setMeetingData] = useState({
    selectedUsers: [],
    physicalRoom: null,
    virtualRoom: null,
    accessToken: accessToken,
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const [users, setUsers] = useState([])
  const [salas, setSalas] = useState([]);
  const [time, setTime] = useState([])
  const [singlePauta, setSinglePauta] = useState(``);
  const [pautas, setPautas] = useState([]);

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
    fetchSalas();
  }, []);

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/user/fetchall").then((response) => {
        const data = response.data
        setUsers(data)
      })
    } catch (error) {
      console.error(error)
    }
  })

  const handleChange = (event, dictKey, value) => {
    event.preventDefault();
    setMeetingData({
      ...meetingData,
      [dictKey]: value,
    });
  };

  const convertTimeToMinutes = (timeString) => {
    const [hoursString, minutesString] = timeString.split(":");
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);
    return hours * 60 + minutes;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const durationInMinutes = convertTimeToMinutes(meetingData.insertTime);

    let endTime = new Date()
    let [minutes, seconds] = meetingData.insertTime.split(":")

    endTime.setMinutes(parseInt(minutes))
    endTime.setSeconds(parseInt(seconds))

    let beginningTime = new Date(meetingData.datetime)

    endTime.setHours(parseInt(minutes) + beginningTime.getHours())
    endTime.setMinutes(parseInt(seconds) + beginningTime.getMinutes())
    endTime.setSeconds("00")

    meetingData.insertTime = endTime

    // Montando o objeto de dados para enviar na requisição
    let requestData = {
      topic: meetingData.protocol, // Substitua por como você está definindo o protocolo
      description: meetingData.description,
      beginning_time: meetingData.datetime, // Substitua por como você está definindo a data e hora
      end_time: meetingData.insertTime,
      duration: durationInMinutes,
      startDate: formatISO(meetingData.datetime),
      accessToken: meetingData.accessToken,
      meetingType: selectedCategory, // Substitua por como você está definindo o tipo de reunião
      physicalRoom: meetingData.physicalRoom,
      virtualRoom: meetingData.virtualRoom,
      participants: meetingData.selectedUsers, // Obtendo os IDs dos participantes selecionados
      meetingTheme: pautas,
    };

    // Enviar a requisição para o backend
    axios
      .post("http://localhost:8080/meeting/create-meeting", requestData, {
        withCredentials: true,
      }).then((response) => {
        console.log("join ", response.data.join_url)
        console.log("start ",response.data.start_url)
        console.log("passcode ",response.data.pstn_password)
        requestData.join_url = response.data.join_url
        requestData.start_url = response.data.start_url
        requestData.passcode = response.data.pstn_password

        console.log(requestData)

      })
      .catch((error) => {
        console.error(error);
        // Tratamento de erro, se necessário
      });
    axios
      .post("http://localhost:8080/meeting/create", requestData, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success("Reunião criada com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Lógica adicional após a criação da reunião, se necessário
      })
      .catch((error) => {
        console.error(error);
        // Tratamento de erro, se necessário
      });
  };

  const handleRoomSelection = (id) => {
    if (id == "replacePhysicalRoom") {
      setMeetingData({
        ...meetingData,
        physicalRoom: null,
      });
      return;
    } else if (id == "replaceVirtualRoom") {
      setMeetingData({
        ...meetingData,
        virtualRoom: null,
      });
      return;
    }

    const selectedRoom = salas.find((sala) => sala.id == id);
    if (selectedRoom) {
      if (selectedRoom.type == "Fisica") {
        setMeetingData({
          ...meetingData,
          physicalRoom: selectedRoom,
        });
      } else {
        setMeetingData({
          ...meetingData,
          virtualRoom: selectedRoom,
        });
      }
    } else {
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

    } else {
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


  function handlePautaDelete(index) {
    const newPautas = [...pautas];
    newPautas.splice(index, 1);
    setPautas(newPautas);
  }


  function handleCategoryChange(category) {
    if (category == 1) {
      handleRoomSelection("replaceVirtualRoom")
    } else if (category == 3) {
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
      <div className="w-full flex justify-center">

        <form
          className="p-4  mt-4 standardFlex  w-5/6 flex-col gap-8  "
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* {PRIMEIRA LINHA} */}
          <div className="w-full flex justify-between items-center gap-32">
            {/* TITULO DA REUNIÃO */}
            <div className="standardFlex flex-col w-2/5 lg:items-start">
              <label htmlFor="meetingName" className="text-2xl my-4 ">
                Título da Reunião
              </label>
              <input
                type="text"
                id="meetingName"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleChange(e, "protocol", e.target.value)}
              ></input>
            </div>

            {/* CATEGORIA DA REUNIÃO */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label className="text-2xl my-4">Categoria da reunião</label>
              <div className="flex gap-8">
                <button
                  type="button"
                  className={`border border-slate-400 ${selectedCategory === 1 ? "bg-[#F6A700] " : ""
                    } p-4 rounded-md`}
                  onClick={(e) => handleCategoryChange(1)}
                >
                  Presencial
                </button>
                <button
                  type="button"
                  className={`border border-slate-400 ${selectedCategory === 2 ? "bg-[#F6A700] " : ""
                    } p-4 rounded-md`}
                  onClick={(e) => handleCategoryChange(2)}
                >
                  Hibrido
                </button>
                <button
                  type="button"
                  className={`border border-slate-400 ${selectedCategory === 3 ? "bg-[#F6A700] " : ""
                    } p-4 rounded-md`}
                  onClick={(e) => handleCategoryChange(3)}
                >
                  Virtual
                </button>
              </div>
            </div>
          </div>


          {/* {SEGUNDA LINHA} */}
          <div className="w-full flex justify-between items-center gap-32">
            {/* DATA DA REUNIÃO */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5 ">
              <label htmlFor="Data" className="text-2xl my-4">
                Data
              </label>
              <input
                type="datetime-local"
                id="Data"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleChange(e, "datetime", e.target.value)}
              ></input>
            </div>

            {/* DESCRICAO DA REUNIÃO */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5">
              <label htmlFor="description" className="text-2xl my-4">
                Descricão
              </label>
              <input
                type="text"
                id="description"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleChange(e, "description", e.target.value)}
              ></input>
            </div>

          </div>


          {/* {TERCEIRA LINHA} */}
          <div className={`w-full flex ${selectedCategory == 2 ? "justify-between" : "justify-start"} items-center gap-32`}>

            {selectedCategory == 1 || selectedCategory == 2 ? (
              <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                <label className="text-2xl my-4">Sala Fisica</label>
                <select
                  className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
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
              <div className="standardFlex flex-col items-center lg:items-start w-2/5">
                <label className="text-2xl my-4">Sala Virtual</label>
                <select
                  className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
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


          </div>

          {/* SALA FISICA */}



          {/* QUARTA LINHA */}
          <div className="w-full flex justify-between items-center gap-12 min-h-40">
            {/* USUARIO */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5 min-h-40">
              <label className="text-2xl my-4">Adicionar usuários a reunião</label>
              <select
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={handleUserSelection}
              >
                <option value="">Adicione um novo usuario</option>
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
                      className="flex border p-2 gap-4 justify-between rounded-lg my-2"
                    >
                      <p>{user.name}</p>
                      <button onClick={() => handleRemoveUser(user.id)}>X</button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            {/* PAUTAS DA REUNIÃO */}
            <div className="standardFlex flex-col items-center lg:items-start w-2/5 min-h-40">
              <label className="text-2xl my-4">Adicionar pautas a reunião</label>
              <div className="w-full flex gap-4">
                <input
                  type="text"
                  id="pautas"
                  value={singlePauta}
                  className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                  onChange={(e) => setSinglePauta(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (singlePauta.trim() !== "") {
                      setPautas([...pautas, singlePauta]);
                      setSinglePauta(""); // Limpa o campo de entrada
                    }
                  }}
                  className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-full border border-slate-400"
                >
                  <AiOutlinePlus />
                </button>
              </div>

              <div className="flex gap-4 w-full">
                {pautas.length > 0
                  ? pautas.map((pauta, index) => (
                    <div
                      key={index}
                      className="flex border p-2 gap-4 justify-between rounded-lg my-2"
                    >
                      <p>{pauta}</p>
                      <button onClick={() => handlePautaDelete(index)}>X</button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>

          <div className="">
            <div className="standardFlex flex-col items-center lg:items-start w-2/5 min-h-40">
              <label htmlFor="insertTime" className="text-2xl my-4 ">
                Duração da reunião
              </label>
              <input
                type="time"
                id="insertTime"
                className="w-full lg:w-full h-12 p-1 border focus:border-black rounded-md bg-[#D9D9D9]"
                onChange={(e) => handleChange(e, "insertTime", e.target.value)}
              ></input>
            </div>
            <div className="w-full flex lg:justify-end mt-8">
              <button
                type="submit"
                className="bg-[#FED353] transition easy-in-out hover:bg-[#F6A700] p-3 rounded-md border border-slate-400 w-2/12"
              >
                Criar
              </button>
            </div>
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
  );
}
