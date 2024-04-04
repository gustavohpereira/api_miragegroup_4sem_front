import { useState } from "react";
import PageTitle from "./pageTitle/PageTitle";

export default function NewRoom() {

    const [meetingData, setMeetingData] = useState({})
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleChange = (event,dictKey,value) => {
        
        event.preventDefault()
        setMeetingData({
            ...meetingData,
            [dictKey]: value
        })
       
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setMeetingData({
            ...meetingData,
            'category': selectedCategory
        })
        console.log(meetingData)
        
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

        <PageTitle>Nova sala</PageTitle>

        {/* New Meeting Form */}
        <div>

        <form className="p-4 mt-4 standardFlex  w-full flex-col gap-8  " onSubmit={(e) => handleSubmit(e)}>
            <div className="standardFlex flex-col w-full items-center lg:items-start">
                <label htmlFor="meetingName" className="text-2xl my-2">Título da Reunião</label>
                <input type="text" id="meetingName" className="w-full lg:w-1/2  p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"title",e.target.value)}></input>
            </div>
            <div className="standardFlex flex-col items-center lg:items-start">
                <label  className="text-2xl my-4" >Categoria da reunião</label>
                <div className="flex gap-8">
                    <button className={`border border-slate-400 ${selectedCategory === 'Presencial' ? 'bg-[#F6A700] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Presencial')}>Presencial</button>
                    <button className={`border border-slate-400 ${selectedCategory === 'Hibrido' ? 'bg-[#F6A700] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Hibrido')}>Hibrido</button>
                    <button className={`border border-slate-400 ${selectedCategory === 'Virtual' ? 'bg-[#F6A700] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Virtual')}>Virtual</button>
                </div>
            </div>

            <div className="standardFlex flex-col items-center lg:items-start ">
                <label htmlFor="Data" className="text-2xl my-4">Data</label>
                <input type="datetime-local" id="Data" className="w-full lg:w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"Data",e.target.value)}></input>
            </div>

            <div className="standardFlex flex-col items-center lg:items-start">
                <label htmlFor="description" className="text-2xl my-4">Descricão</label>
                <input type="text" id="description" className="w-full lg:w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"description",e.target.value)}></input>
            </div>
            
            <div className="standardFlex flex-col items-center lg:items-start">
                <label htmlFor="anexos" className="text-2xl my-4">Anexos</label>
                <input type="file" id="anexo" className="w-full lg:w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"document",e.target.value)}></input>
            </div>

            <div className="mt-8 w-full lg:w-1/2 flex lg:justify-end justify-center ">
                <button type="submit" className="bg-[#F6A700] p-4 rounded-md w-4/12 border border-slate-400">criar</button>
            </div>

        </form>
        </div>

    </div>
  );
}
