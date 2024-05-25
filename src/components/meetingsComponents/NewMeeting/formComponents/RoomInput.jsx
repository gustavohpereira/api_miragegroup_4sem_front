export default function RoomInput({ salas, selectedCategory, handleChange }) {

  const handleRoomSelection = (id) => {
    const selectedRoom = salas.filter((sala) => sala.type == selectedCategory).find((sala) => sala.id == id);
    console.log("selectedRoom", selectedRoom)
    if (selectedRoom) {
      if (selectedRoom.type == "Fisica") {
        handleChange("physicalRoom", selectedRoom);
      } else if (selectedRoom.type == "Virtual"){
        console.log("selectedRoomvirtual", selectedRoom)
        handleChange("virtualRoom", selectedRoom);
      }
    }
  };

  return (
    <div className="standardFlex flex-col items-center lg:items-start lg:pr-10 self-start">
      <label className="text-xl my-4">Sala Virtual / Presencial</label>
      <select
        type="select"
        onChange={(e) => handleRoomSelection(e.target.value)}
        className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
      >
        <option value="" disabled>
          {selectedCategory == null ? "Selecione uma categoria" : "Selecione uma sala"}
        </option>
        {salas &&
          salas
            .filter((sala) => sala.type == selectedCategory)
            .map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.type == "Virtual" ? `Sala Virtual ${sala.id}` : sala.name}
              </option>
            ))}
      </select>
    </div>
  );
}