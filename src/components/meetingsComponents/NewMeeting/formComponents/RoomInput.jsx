export default function RoomInput({ salas,selectedCategory, handleChange }) {

  const handleRoomSelection = (id) => {
    const selectedRoom = salas.find((sala) => sala.id == id);
    if (selectedRoom) {
      if (selectedRoom.type === "Fisica") {
        handleChange("physicalRoom", selectedRoom);
      } else {
        handleChange("virtualRoom", selectedRoom);
      }
    }
  };
  console.log(salas, selectedCategory);
  return (
    <div className="standardFlex flex-col items-center lg:items-start lg:pr-10 self-start">
      <label className="text-xl my-4">Sala Virtual / Presencial</label>
      <select
        type="select"
        onChange={(e) => handleRoomSelection(e.target.value)}
        className="w-full lg:w-full h-10 p-1 border focus:border-black rounded-md bg-[#EFEFEF]"
      >
        {selectedCategory == null ? (
          <option value={null}>Selecione uma categoria</option>
        ) : null}
        {salas
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
