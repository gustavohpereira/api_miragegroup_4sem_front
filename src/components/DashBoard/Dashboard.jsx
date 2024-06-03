import React from "react";
import PageTitle from "../pageTitle/PageTitle";
import TodayMeeting from "./TodayMeetings/todayMeeting";

const Dashboard = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }

    return (
        <div className="text-lg lg:standardFlex flex-col gap-5">
            <PageTitle>Dashboard</PageTitle>
            <TodayMeeting />
        </div>
    );
}

export default Dashboard;
