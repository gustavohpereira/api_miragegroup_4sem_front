export default function Sidebar() {
  const links = [
    {
      name: "Home",
      icon: "home_logo.svg",
      link: "/dashboard",
    },

    {
      name: "New Meeting",
      icon: "new_meeting_logo.svg",
      link: "/new_meeting",
    },

    {
      name: "Calendar",
      icon: "calendário_bg.svg",
      link: "/calendar",
    },

    {
      name: "Clock",
      icon: "clock_icon.svg",
      link: "/clock",
    },

    {
      name: "New User",
      icon: "new_user.svg",
      link: "/new_user",
    },
  ];

  return (
    <div className="h-16 w-full  lg:h-screen lg:w-[10%] sticky top-0 bg-sidebar-bg lg:w-sidebar-width border-r border-sidebar-border bg-[#D9D9D9] flex lg:flex-col justify-start items-center">
      <div className="border-b border-black w-full lg:flex justify-center items-center py-6 hidden">
        <img src="orca_logo.svg" alt="" className="h-16"></img>
      </div>

      <div className="flex lg:flex-col justify-start items-center  my-16 w-full">
        {links.map((link) => {
          return (
            <a
              href={link.link}
              className="w-full flex justify-center lg:justify-start items-center py-4 hover:bg-slate-500 "
            >   
            <div className="w-1/3 lg:flex justify-center hidden mr-1">
              <img src={link.icon} alt="" className="h-8"></img>
            </div>
              <p className="text-xs lg:text-sm">{link.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
