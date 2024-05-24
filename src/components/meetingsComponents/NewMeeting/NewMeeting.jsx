import { useEffect, useState } from "react";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineDown, AiOutlinePlus, AiOutlineUp } from "react-icons/ai";
import { formatISO } from "date-fns";
import MultiSelectDropdown from "./MultiSelectDropdown";

export default function NewMeeting() {
  const accessToken = localStorage.getItem("accessToken");
  const [meetingData, setMeetingData] = useState({
    selectedUsers: [],
    physicalRoom: null,
    virtualRoom: null,
    accessToken: accessToken,
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const [users, setUsers] = useState([]);
  const [salas, setSalas] = useState([]);
  const [singlePauta, setSinglePauta] = useState(``);
  const [pautas, setPautas] = useState([]);
  const [creatingMeeting, setCreatingMeeting] = useState(false);

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
        const data = response.data;
        setUsers(data);
      });
    } catch (error) {
      console.error(error);
    }
  });

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
    setCreatingMeeting(true);

    
    let endTime = new Date()
    let [minutes, seconds] = meetingData.insertTime.split(":")
    const durationInMinutes = convertTimeToMinutes(meetingData.insertTime);

    
    endTime.setMinutes(parseInt(minutes));
    endTime.setSeconds(parseInt(seconds));

    let beginningTime = new Date(meetingData.datetime);

    endTime.setHours(parseInt(minutes) + beginningTime.getHours());
    endTime.setMinutes(parseInt(seconds) + beginningTime.getMinutes());
    endTime.setSeconds("00");

    meetingData.insertTime = endTime;

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
        requestData.join_url = response.data.join_url

        axios.post("http://localhost:8080/meeting/create", requestData, {
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
          setCreatingMeeting(false);
        })
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
  

  function handlePautaDelete(index) {
    const newPautas = [...pautas];
    newPautas.splice(index, 1);
    setPautas(newPautas);
  }

  function handleCategoryChange(category) {
    if (category == 1) {
      handleRoomSelection("replaceVirtualRoom");
    } else if (category == 3) {
      handleRoomSelection("replacePhysicalRoom");
    }
    setSelectedCategory(category);
  }

  return (
    <div className="w-full h-full" >
      <PageTitle>Nova Reunião</PageTitle>
      <div className="w-full">
        {/* New Meeting Form */}
        <form
          className="p-4 mt-4 gap-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-1 w-full justify-between items-center gap-32">
              {/* TITULO DA REUNIÃO */}
              <div className="standardFlex flex-col w-4/6 items-center lg:items-start">
                <label htmlFor="meetingName" className="text-xl my-4">
                  Título da Reunião
                </label>
                <input
                  type="text"
                  id="meetingName"
                  className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
                  onChange={(e) => handleChange(e, "protocol", e.target.value)}
                />
              </div>

              {/* DATA DA REUNIÃO */}
              <div className="grid grid-cols-1 items-center lg:items-start lg:grid-cols-2 w-4/6 ">
                <div className="standardFlex flex-col items-center lg:items-start lg:w-3/4">
                  <label htmlFor="Data" className="text-xl my-4">
                    Data
                  </label>
                  <input
                  type="date"
                  id="Data"
                  className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF] ::placeholder-center"
                  onChange={(e) => handleChange(e, "datetime", e.target.value)}
                  />
                </div>

                <div className="standardFlex flex-col items-center lg:items-start">
                  <label htmlFor="Data" className="text-xl my-4">
                    Horário
                  </label>
                  <div className="flex w-4/5 gap-6">
                    <input
                    type="time"
                    id="Time"
                    className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
                    onChange={(e) => handleChange(e, "time", e.target.value)}
                    /> 
                    <label className="text-xl">às</label>
                    <input
                    type="time"
                    id="Time"
                    className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
                    onChange={(e) => handleChange(e, "time", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* PARTICIPANTES */}
              <div className="standardFlex flex-col w-4/6 items-center lg:items-start">
                <div className="standardFlex flex-col w-5/6 items-center lg:items-start" >
                  <label htmlFor="participants" className="text-xl my-4">
                    Adicione um novo usuario
                  </label>
                  <MultiSelectDropdown
                  options={users}
                  selectedOptions={meetingData.selectedUsers}
                  setSelectedOptions={(selected) =>
                    setMeetingData({
                    ...meetingData,
                    selectedUsers: selected,
                    })
                  }
                  placeholder="Adicione um novo usuario"
                  />
                </div>
              </div>

              {/* CATEGORIA DA REUNIÃO */}
              <div className="standardFlex flex-col items-center lg:items-start w-4/6">
              <label className="text-xl my-4">Categoria</label>
              <div className="grid grid-cols-3 lg:w-3/5 ">
                <button
                  type="button"
                  className={`border border-slate-400 ${
                    selectedCategory === 1 ? "bg-[#FED353] text-[#FFFFFF] border-none shadow-lg" : ""
                  } p-1 rounded-md`}
                  onClick={(e) => handleCategoryChange(1)}
                >
                  Presencial
                </button>
                <button
                  type="button"
                  className={`border border-slate-400 ${
                    selectedCategory === 2 ? "bg-[#FED353] text-[#FFFFFF] border-none shadow-lg" : ""
                  } p-1 rounded-md`}
                  onClick={(e) => handleCategoryChange(2)}
                >
                  Híbrido
                </button>
                <button
                  type="button"
                  className={`border border-slate-400 ${
                    selectedCategory === 3 ? "bg-[#FED353] text-[#FFFFFF] border-none shadow-lg" : ""
                  } p-1 rounded-md`}
                  onClick={(e) => handleCategoryChange(3)}
                >
                  Virtual
                </button>
              </div>
            </div>

            {/* SALAS E PAUTAS */ }
            <div className="grid grid-cols-1 items-center lg:items-start lg:grid-cols-2 w-4/6 ">
              {/* SALAS */ }
              <div className="standardFlex flex-col items-center lg:items-start lg:pr-10 self-start">
                <label className="text-xl my-4">Sala Virtual / Presencial</label>
                <select type="select" className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"/>
              </div>

              {/* PAUTAS */ }
              <div className="standardFlex flex-col items-center lg:items-start lg:pl-10">
                <label className="text-xl my-4">Adicionar Pautas a Reunião</label>
                <div className="flex w-full lg:w-full h-10 gap-1 rounded-md bg-[#EFEFEF]
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm">
                  <input type="text" 
                  id="pautas"
                  value={singlePauta}
                  className="w-full lg:w-full h-8 bg-[#EFEFEF] p-1 border-0"
                  onChange={(e) => setSinglePauta(e.target.value)}/>
                  <button
                  type="button"
                  onClick={() => {
                    if (singlePauta.trim() !== "") {
                      setPautas([...pautas, singlePauta]);
                      setSinglePauta(""); // Limpa o campo de entrada
                    }
                  }}
                  className="transition easy-in-out hover:bg-slate-300 p-3 "
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex gap-x-4 gap-y-3 w-[105%] flex-wrap mt-4 text-sm">
                  {pautas.length > 0
                  ? pautas.map((pauta, index) => (
                    <div
                    key={index}
                    className="flex border py-1 px-2 gap-4 justify-between rounded-full"
                    >
                      <p>{pauta}</p>
                      <button onClick={() => handlePautaDelete(index)}>
                        X
                      </button>
                    </div>
                  ))
                  : null}
                </div>
              </div>
            </div>

            {/* DESCRICAO DA REUNIÃO */}
            <div className="grid grid-cols-3">
              <div className="col-span-2 standardFlex flex-col items-center lg:items-start ">
                <label htmlFor="description" className="text-xl my-4">
                  Descrição
                </label>
                <textarea
                  type="textArea"
                  id="description"
                  className="w-full lg:w-full h-[150px] p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
                  onChange={(e) => handleChange(e, "description", e.target.value)}
                />
              </div>
              
              {/* BOTÃO CRIAR REUNIÃO */}
              <div className="w-full flex lg:justify-end self-end mt-8">
                {creatingMeeting === false ? (
                  <button
                    type="submit"
                    className="bg-[#FED353] text-[#FEFEFE] transition easy-in-out hover:bg-[#F6A700] p-2 rounded-md shadow-lg w-[124px]"
                  >
                    Criar
                  </button>
                ) : (
                  <div
                    role="status"
                    className="p-2 rounded-md bg-[#FED353] flex justify-center shadow-lg w-[124px]"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
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
  )
}