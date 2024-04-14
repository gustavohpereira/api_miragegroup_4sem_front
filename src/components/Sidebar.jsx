import { Link } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    {
      name: "Home",
      icon: "home_logo.svg",
      link: "/dashboard",
    },

    {
      name: "Salas",
      icon: "room.svg",
      link: "/newRoom",
    },
    {
      name: "Reuniões",
      icon: "meeting.svg",
      link: "/newMeeting",
    },
    {
      name: "Usuários",
      icon: "user.svg",
      link: "/addUser",
    },
    {
      name: "Configurações",
      icon: "configurações.svg",
      link: "",
    },
  ];

  return (
    <div className="h-16 w-full  lg:h-screen lg:w-[15%] sticky top-0 bg-sidebar-bg lg:w-sidebar-width border-r border-sidebar-border bg-[#262932] flex lg:flex-col justify-start items-center lg:py-6">
      <div className=" w-full lg:flex justify-center items-center py-6 hidden">
        <img src="orca_logo.svg" alt="" className="h-20 w-20 bg-[#FED353] rounded-full"></img>
      </div>

      <div className="flex lg:flex-col justify-start items-center px-2  my-16 w-full  lg:px-6  lg:gap-8">
        {links.map((link) => {
          return (
            <a
            key={link.name}
              href={link.link}
              className="w-full flex justify-center lg:justify-start items-center lg:py-4  transition easy-in-out hover:bg-[#F6A700] text-[#FED353] lg:text-black lg:bg-[#FED353] hover:text-white rounded-lg "
            >   
            <div className="w-1/3 lg:flex justify-center hidden ">
              <img src={link.icon} alt="" className="h-6"></img>
            </div>
              <p className="text-xs lg:text-sm">{link.name}</p>
            </a>
          );
        })}
      </div>

      {/* <div className="flex gap-4">
        <button className="bg-[#FED353] hover:bg-[#F6A700] lg:w-12 w-8 p-2  rounded-full">
          <img src="/configurações.svg" className=""></img>
        </button>
        <button className="bg-[#FED353] hover:bg-[#F6A700] lg:w-12 p-2 w-8 rounded-full">
          <img src="/home_logo.svg" className=""></img>
        </button>
      </div> */}
      <Link to="/logout" replace={true}>
      <button className="bg-[#FED353] transition easy-in-out hover:bg-[#D83838] lg:w-12 p-2 w-8 rounded-full">
          <img src="/logout.svg" className=""></img>
      </button>
      </Link>
    </div>
  );
}
