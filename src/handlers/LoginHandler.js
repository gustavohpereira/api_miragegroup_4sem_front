import axios from "axios"

const loginHandler = async (data) => {

    try{
        axios.post('http://localhost:8080/user/login', data, { withCredentials: true }).then((response) => {
            console.log(response.status);
        })
    }catch(error){
        console.error(error)
    }
}

export default loginHandler