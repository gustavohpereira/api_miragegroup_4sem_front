import React from "react";
import PageTitle from "../pageTitle/PageTitle";
import TodayMeeting from "./TodayMeetings/todayMeeting";



const Dashboard = () => {
    return (
        <div className="w-full text-xl standardFlex flex-col  gap-8 ">


            <PageTitle>Dashboard</PageTitle>
            <TodayMeeting />
        </div>
    )
}

export default Dashboard
