import React, { useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import TodayMeeting from "./TodayMeetings/todayMeeting";
import individualMeetingForm from "../IndividualMeetingForm/individualMeetingForm";
import IndividualMeetingForm from "../IndividualMeetingForm/individualMeetingForm";
import { ModalWrapper } from "../wrappers/modalWrapper";

const Dashboard = () => {

    const [openModal, setOpenModal] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }

    return (
        <div className="text-lg standardFlex flex-col gap-5">
            <PageTitle>Dashboard</PageTitle>
            <button
                onClick={() => setOpenModal(true)}
                className=" bg-[#FED353] text-[#FEFEFE] transition easy-in-out hover:bg-[#F6A700] p-2 rounded-md shadow-lg w-[124px]"
              >
                Criar reunião individual
              </button>
            <TodayMeeting />
            <ModalWrapper onClose={() => setOpenModal(false)} isOpen={openModal}><IndividualMeetingForm></IndividualMeetingForm></ModalWrapper>
        </div>
    );
}

export default Dashboard;
