import { format } from "date-fns";


export default function MeetingCard({m, showDelete}) {

var location = ""

var meetingType = "";


    if (m.meetingType == 1){
        meetingType = "Fisica"
        location =  'local: ' +m.physicalRoom.location
    }else if (m.meetingType == 2){
        meetingType = "Hibrida"
        location = 'local: ' + m.physicalRoom.location
    }else{
        meetingType = "Virtual"
    }


  return (
    <div
      className="standardFlex border border-black rounded-lg items-center p-2 px-6 justify-between w-full"
      key={m.nome}
    >
      <div className="flex justify-start gap-4">
        <div className=" min-w-96 max-w-96">
          <h1 className="text-2xl ">{m.protocol}</h1>
          <p className="text-lg font-light">
                Tipo de reunião: {meetingType}
          </p>
        </div>
        <div className="flex flex-col   min-w-96 max-w-min-w-96">
          <p className="text-lg font-light">
            Capacidade máxima:{" "}
            {m.meetingType == 1 || m.meetingType == 2
              ? m.physicalRoom.occupancy
              : "livre"}
          </p>
          <p className="text-lg font-light">
                {location}
          </p>
        </div>

        <div className="flex gap-8">
          <p className="text-lg font-light">
            {format(new Date(m.datetime), "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <button className="bg-[#F6A700] p-4 rounded-md border border-slate-400">
          <p>Entrar na Reunião</p>
        </button>

        {showDelete == true && (
          <button className="bg-red-500 p-4 rounded-md border border-slate-400">
            <p>Excluir Reunião</p>
          </button>
        )}
      </div>
    </div>
  );
}
