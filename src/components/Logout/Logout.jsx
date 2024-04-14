import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
    const { setToken } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        setToken()
        navigate("/", { replace: true })
    }

    handleLogout()
}

export default Logout