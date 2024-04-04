import React from "react";
import HeaderComponent from "../HeaderComponent";
import PageTitle from "../pageTitle/PageTitle";



const Dashboard = () => {
    return (
        <div className="w-full text-xl standardFlex flex-col  gap-8 ">
            
            
            <PageTitle>Dashboard title</PageTitle>
            <a href="/" className="bg-yellow-400 w-1/12 p-4 rounded-lg border border-black">Log Out</a>
        </div>
    )
}

export default Dashboard
