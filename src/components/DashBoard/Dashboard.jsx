import React from "react";
import HeaderComponent from "../HeaderComponent";
import PageTitle from "../pageTitle/PageTitle";
import TodayMeeting from "../TodayMeetings/todayMeeting";



const Dashboard = () => {
    return (
        <div className="w-full text-xl standardFlex flex-col  gap-8 ">
            
            
            <PageTitle>Dashboard</PageTitle>
            <a href="/" className="bg-yellow-400 w-1/12 p-4 rounded-lg border border-black">Log Out</a>
            <TodayMeeting />
        </div>
    )
}

export default Dashboard
