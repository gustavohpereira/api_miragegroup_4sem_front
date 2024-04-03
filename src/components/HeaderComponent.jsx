import React from "react";

export default function HeaderComponent() {
  return (
    <div className="flex p-4 w-full justify-end bg-black/90">
      <div className="flex gap-4">
        <button className="bg-[#FED353] hover:bg-[#F6A700] w-10  rounded-full">
          <img src="/new_user.svg" className=""></img>
        </button>
        <button className="bg-[#FED353] hover:bg-[#F6A700] w-10  rounded-full">
          <img src="/new_user.svg" className=""></img>
        </button>
      </div>
    </div>
  );
}
