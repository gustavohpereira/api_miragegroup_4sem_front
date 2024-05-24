import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();

  function handleLogoutSidebar() {
    const confirm = window.confirm("Tem certeza que deseja sair?");
    if (confirm) {
      nav("/logout");
    } else {
      return;
    }
  }

  const { user } = useAuth();

  const links = [
    {
      name: "Home",
      icon: "/home_logo.svg",
      link: "/dashboard",
    },
    {
      name: "Salas",
      icon: "/room.svg",
      link: "/newRoom",
      subRoutes: ["/createRoom"]
    },
    {
      name: "Reuniões",
      icon: "/meeting.svg",
      link: "/meetings",
      subRoutes: ["/createMeeting"]
    },
    {
      name: "Usuários",
      icon: "/user.svg",
      link: "/users",
      subRoutes: ["/addUser"]
    },
  ];

  return (
    <div className="h-16 w-full lg:h-screen lg:min-w-[15rem] lg:max-w-[15rem] sticky top-0 bg-sidebar-bg lg:w-sidebar-width border-r border-sidebar-border bg-[#262932] flex lg:flex-col justify-between items-center lg:py-6">
      <div className="w-full">
        <div className="w-full lg:flex justify-center items-center py-6 hidden">
          <img src="/orca_logo.svg" alt="" className="h-20 w-[112px]"></img>
        </div>

        <div className="flex lg:flex-col justify-start items-center px-2 my-16 w-full lg:px-6 lg:gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.link || (link.subRoutes && link.subRoutes.includes(location.pathname));

            if (link.name === 'Usuários' && user.role === 'admin') {
              return (
                <Link
                  key={link.name}
                  to={link.link}
                  className={`w-full flex justify-center lg:justify-start items-center lg:py-4 transition easy-in-out ${
                    isActive ? 'bg-[#FED353] text-white pl-3' : 'hover:bg-[#575757] text-[#FED353] lg:text-[#FEFEFE] hover:text-white'
                  } rounded-lg relative`}
                >
                  {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#FED353] rounded-r-lg ml-[-22px]"></span>}
                  <div className="lg:flex items-center gap-4 px-8 hidden">
                    <div>
                      <img src={link.icon} alt="" className="h-6"></img>
                    </div>
                    <p className="text-xs lg:text-base">{link.name}</p>
                  </div>
                </Link>
              );
            }

            if (link.name !== 'Usuários') {
              return (
                <Link
                  key={link.name}
                  to={link.link}
                  className={`w-full flex justify-center lg:justify-start items-center lg:py-4 transition easy-in-out ${
                    isActive ? 'bg-[#FED353] text-white pl-3' : 'hover:bg-[#575757] text-[#FED353] lg:text-[#FEFEFE] hover:text-white'
                  } rounded-lg relative`}
                >
                  {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#FED353] rounded-r-lg ml-[-22px]"></span>}
                  <div className="lg:flex items-center gap-4 px-8 hidden">
                    <div>
                      <img src={link.icon} alt="" className="h-6"></img>
                    </div>
                    <p className="text-xs lg:text-base">{link.name}</p>
                  </div>
                </Link>
              );
            }

            return null;
          })}
        </div>
      </div>

      <div className="">
        <button type="button" className="flex text-[#FEFEFE] lg:w-42 p-2 w-full gap-4 hover:bg-[#575757] rounded-lg" onClick={handleLogoutSidebar}>
          <div className="w-1/6">
            <img src="/logout.svg" alt="Logout" />
          </div>
          <label className="cursor-pointer">Sair da conta</label>
        </button>
      </div>
    </div>
  );
}
