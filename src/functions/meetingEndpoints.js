import axios from "axios";

    export async function getAllMeetings() {
    try {
        const response = await axios.get("http://localhost:8080/meeting/get");
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
        return [];
      }
  }

export async function getMeetingsByUser(userId){
    console.log("id",userId)
    try{
        const response = await axios.get(`http://localhost:8080/meeting/fetch/${userId}`);
        console.log("response",response.data)
        return response.data
    }catch(error){
        console.error("Erro ao buscar salas:", error);
        return [];
    }
}