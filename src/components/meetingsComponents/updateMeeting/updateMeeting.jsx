import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../pageTitle/PageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { formatISO } from "date-fns";
import MultiSelectDropdown from "../NewMeeting/formComponents/MultiSelectDropdown";
import TitleInput from "../NewMeeting/formComponents/TitleInput";
import PautaInput from "../NewMeeting/formComponents/PautaInput";
import { CategoryButtons } from "../NewMeeting/formComponents/CategoryButtons";
import RoomInput from "../NewMeeting/formComponents/RoomInput";
import DateTimeForm from "../NewMeeting/formComponents/DateTimeFormUpdate";
import DescriptionForm from "../NewMeeting/formComponents/DescriptionForm";
import DateTimeFormUpdate from "../NewMeeting/formComponents/DateTimeFormUpdate";
import ExternalInput from "../NewMeeting/formComponents/ExternalInput";

export default function UpdateMeeting() {
  const { meetingId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [meetingData, setMeetingData] = useState({
    selectedUsers: [],
    physicalRoom: null,
    virtualRoom: null,
    accessToken: accessToken,
    pautas: [],
    protocol: "",
    salas: [],
    beginning_time: "",
    end_time: "",
    category: "default",
    description: "",
    datetime: "",
    guests: [],
  });
  const [users, setUsers] = useState([]);
  const [updatingMeeting, setUpdatingMeeting] = useState(false);

  const fetchSalas = async () => {
    try {
      const [responseSalasFisicas, responseSalasVirtuais] = await Promise.all([
        axios.get("http://localhost:8080/physicalRoom/get"),
        axios.get("http://localhost:8080/virtualRoom/get"),
      ]);

      const salas = [
        ...responseSalasFisicas.data.map((sala) => ({
          ...sala,
          type: "Fisica",
        })),
        ...responseSalasVirtuais.data.map((sala) => ({
          ...sala,
          type: "Virtual",
        })),
      ];

      setMeetingData((prevData) => ({ ...prevData, salas }));
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/fetchall");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryNumber = (category) => {
    const categoryMap = { Fisica: 1, Virtual: 3, default: 2 };
    return categoryMap[category] || categoryMap["default"];
  };

  const handleUpdateSubmit = async (
    event,
    meetingData,
    meetingId,
    setUpdatingMeeting,
    toast
  ) => {
    event.preventDefault();
    setUpdatingMeeting(true);

    const beginningTime = new Date(meetingData.datetime);
    beginningTime.setDate(beginningTime.getDate() + 1);
    const [beginningHours, beginningMinutes] =
      meetingData.beginning_time.split(":");
    beginningTime.setHours(parseInt(beginningHours, 10));
    beginningTime.setMinutes(parseInt(beginningMinutes, 10));
    beginningTime.setSeconds(0);

    const endTime = new Date(meetingData.datetime);
    endTime.setDate(endTime.getDate() + 1);
    const [endHours, endMinutes] = meetingData.end_time.split(":");
    endTime.setHours(parseInt(endHours, 10));
    endTime.setMinutes(parseInt(endMinutes, 10));
    endTime.setSeconds(0);

    if (endTime <= beginningTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    console.log("meetingData: ", formatISO(beginningTime));
    const requestData = {
      topic: meetingData.protocol,
      description: meetingData.description,
      beginning_time: formatISO(beginningTime),
      end_time: formatISO(endTime),
      meetingType: getCategoryNumber(meetingData.category),
      physicalRoom: meetingData.physicalRoom,
      virtualRoom: meetingData.virtualRoom,
      participants: meetingData.selectedUsers,
      meetingTheme: meetingData.pautas,
      guests: meetingData.guests,
    };
    console.log("requestData: ", requestData);
    try {
      await axios.patch(
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
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingMeeting(false);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/meeting/get/${meetingId}`
        );
        const {
          participants,
          physicalRoom,
          virtualRoom,
          topic,
          datetime,
          description,
          meetingType,
          meetingTheme,
          beginning_time,
          end_time,
          guests
        } = response.data;

        // Formatar a data e hora
        const formattedDate = new Date(beginning_time)
          .toISOString()
          .slice(0, 10);

          console.log("formattedDate: ", response.data);

        setMeetingData((prevData) => ({
          ...prevData,
          selectedUsers: participants,
          physicalRoom: physicalRoom,
          virtualRoom: virtualRoom,
          pautas: meetingTheme,
          protocol: topic,
          beginning_time: beginning_time,
          end_time: end_time,
          datetime: formattedDate,
          meetingType: meetingType,
          guests: guests,
          category:
            meetingType == 1
              ? "Fisica"
              : meetingType == 3
              ? "Virtual"
              : "Hibrida",
          description: description,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeetingData();
  }, []);

  const handleChange = (dictKey, value) => {
    setMeetingData((prevData) => ({ ...prevData, [dictKey]: value }));
    console.log("dictKey", dictKey, "value", value);
  };
  return (
    <div className="w-full h-full">
      <PageTitle>Atualizar Reunião</PageTitle>
      <div className="w-full">
        <form
          className="p-4 mt-4 gap-8"
          onSubmit={(e) =>
            handleUpdateSubmit(
              e,
              meetingData,
              meetingId,
              setUpdatingMeeting,
              toast
            )
          }
        >
          <div className="grid grid-cols-1 w-full justify-between items-center gap-32">
            <TitleInput
              title={meetingData.protocol}
              handleChange={handleChange}
            />
            <DateTimeFormUpdate
              beginning_time={meetingData.beginning_time}
              end_time={meetingData.end_time}
              datetime={meetingData.datetime}
              handleChange={handleChange}
            />
            <div className="standardFlex flex-col w-4/6 items-center lg:items-start">
              <div className="standardFlex flex-col w-5/6 items-center lg:items-start">
                <label htmlFor="participants" className="text-xl my-4">
                  Adicione um novo usuario
                </label>
                <MultiSelectDropdown
                  options={users}
                  selectedOptions={meetingData.selectedUsers}
                  setSelectedOptions={(selected) =>
                    handleChange("selectedUsers", selected)
                  }
                  placeholder="Adicione um novo usuario"
                />
              </div>
            </div>
            <CategoryButtons
              selectedCategory={meetingData.category}
              handleChange={handleChange}
            />
            <div className="grid grid-cols-1 items-center lg:items-start lg:grid-cols-2 w-4/6 ">
              <RoomInput
                salas={meetingData.salas}
                selectedCategory={meetingData.category}
                handleChange={handleChange}
              />
              <PautaInput
                handleChange={handleChange}
                pautas={meetingData.pautas}
              />
            </div>
            <div className="grid grid-cols-1 items-center lg:items-start lg:grid-cols-2 w-4/6 ">
              <ExternalInput guests={meetingData.guests} handleChange={handleChange} />
            </div>
            <div className="grid grid-cols-3">
              <DescriptionForm
                description={meetingData.description}
                handleChange={handleChange}
              />
              <div className="w-full flex lg:justify-end self-end mt-8">
                {!updatingMeeting ? (
                  <button
                    type="submit"
                    className="bg-[#FED353] text-[#FEFEFE] transition easy-in-out hover:bg-[#F6A700] p-2 rounded-md shadow-lg w-[124px]"
                  >
                    Atualizar
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
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5532C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7236 75.2124 7.41288C69.5422 4.10219 63.2754 1.94025 56.7222 1.05199C51.7666 0.3679 46.7398 0.446005 41.819 1.27873C39.3192 1.69328 37.8355 4.19778 38.4726 6.62326C39.1097 9.04874 41.586 10.4717 44.0645 10.1071C47.997 9.46216 52.0326 9.42955 55.9408 10.025C61.376 10.8165 66.5979 12.6725 71.2621 15.486C75.9262 18.2996 79.9442 21.9986 83.092 26.3926C85.5668 29.718 87.5354 33.3742 88.8746 37.226C89.7477 39.5843 91.5422 40.2518 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
