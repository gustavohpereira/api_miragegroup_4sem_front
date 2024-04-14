import { useState } from "react";
import axios from "axios";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/room/create", {
        roomName,
        capacity
      });
      console.log("Sala criada com sucesso:", response.data);
      // Lógica adicional após a criação da sala, se necessário
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      // Tratamento de erro, se necessário
    }
  };

  return (
    <div>
      <h2>Criar Sala</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomName">Nome da Sala:</label>
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <label htmlFor="capacity">Capacidade:</label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button type="submit">Criar Sala</button>
      </form>
    </div>
  );
}
