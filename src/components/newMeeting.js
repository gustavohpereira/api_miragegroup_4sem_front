import { useState } from "react";

export default function NewMeeting() {

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
    <div className="w-full">
      <div className=" w-full flex justify-end p-4 gap-6">
        <div className=" p-3 rounded-full border border-black h-16 w-16 bg-[#D9D9D9]">
          <img src="new_meeting_logo.svg" alt=""></img>
        </div>
        <div className=" p-3 rounded-full border border-black h-16 w-16 bg-[#D9D9D9]">
          <img src="new_meeting_logo.svg" alt=""></img>
        </div>
      </div>

      <h1 className="text-4xl font-bold p-4"> New Meeting</h1>
      <hr className="border-1 border-[#D9D9D9]"></hr>

        {/* New Meeting Form */}

        <form className="p-4 mt-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
                <label htmlFor="meetingName" className="text-2xl my-2">Título da Reunião</label>
                <input type="text" id="meetingName" className="w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"title",e.target.value)}></input>
            </div>
            <div className="flex flex-col ">
                <label  className="text-2xl my-6" >Categoria da reunião</label>
                <div className="flex gap-8">
                    <button className={`border border-slate-400 ${selectedCategory === 'Presencial' ? 'bg-[#D9D9D9] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Presencial')}>Presencial</button>
                    <button className={`border border-slate-400 ${selectedCategory === 'Hibrido' ? 'bg-[#D9D9D9] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Hibrido')}>Hibrido</button>
                    <button className={`border border-slate-400 ${selectedCategory === 'Virtual' ? 'bg-[#D9D9D9] ' : ''} p-4 rounded-md`} onClick={(e) => setSelectedCategory('Virtual')}>Virtual</button>
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="Data" className="text-2xl my-6">Data</label>
                <input type="datetime-local" id="Data" className="w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"Data",e.target.value)}></input>
            </div>

            <div className="flex flex-col">
                <label htmlFor="description" className="text-2xl my-6">Descricão</label>
                <input type="text" id="description" className="w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"description",e.target.value)}></input>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="anexos" className="text-2xl my-6">Anexos</label>
                <input type="file" id="anexo" className="w-1/2 p-1 border focus:border-black rounded-md bg-[#D9D9D9]" onChange={(e) => handleChange(e,"document",e.target.value)}></input>
            </div>

            <div className="mt-8">
                <button type="submit" className="bg-[#D9D9D9] p-4 rounded-md w-2/12 border border-slate-400">criar</button>
            </div>

        </form>

    </div>
  );
}
