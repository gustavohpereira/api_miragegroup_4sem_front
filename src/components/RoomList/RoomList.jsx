import PageTitle from "../pageTitle/PageTitle";



export default function RoomList(){

    const salas = [
        { nome: "Sala A", dataMarcada: "2024-04-07", tipo: "Hibrida", usuario: "João" },
        { nome: "Sala B", dataMarcada: "2024-04-08", tipo: "Local", usuario: "Maria" },
        { nome: "Sala C", dataMarcada: "2024-04-09", tipo: "Virtual", usuario: "Pedro" }
    ];

    return(
        <div>
            <PageTitle>Salas</PageTitle>
            <div className="gap-4 flex my-8 ">
                <button className="bg-[#F6A700] p-2 rounded-md  border border-slate-400 w-1/12">
                    Tipo de sala
                </button>
                <button className="bg-[#F6A700] p-2 rounded-md  border border-slate-400 w-1/12">
                    data
                </button>
                <button className="bg-[#F6A700] p-2 rounded-md  border border-slate-400 w-2/12">
                    estado de locação
                </button>
            </div>
            <div className="flex flex-col  gap-4 my-8 ">

                {salas.map((sala)=>{
                    return(

                    <div className="standardFlex border border-black rounded-lg items-center p-2 px-6 justify-between w-full">
                        <div className="flex gap-4">

                            <div className="">
                                <h1 className="text-3xl">{sala.nome}</h1>
                                <p className="text-2xl font-light">{sala.usuario}</p>
                            </div>
                            <div className="flex gap-8">
                                <p>{sala.dataMarcada}</p>
                                <p>{sala.tipo}</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <button className="bg-[#F6A700] p-4 rounded-md  border border-slate-400">

                                <p>Entrar na sala</p>
                            </button>
                            <button className="bg-[#F6A700] p-4 rounded-md  border border-slate-400">

                                <p>Excluir</p>
                            </button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}