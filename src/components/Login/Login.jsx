import React, { useState } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import video from '../../LoginAssets/video.mp4'; 
import logo from '../../LoginAssets/Logo API.png'; 

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {

    const { setToken } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password
        }
        
        try{
            axios.post('http://localhost:8080/user/login', data, { withCredentials: true }).then((response) => {
                setToken(response.data.token)
                navigate("/dashboard", { replace: true })
            })
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="loginPage flexAlignCenter">
        <div className="container flexAlignCenter">

            <div className="videoDiv">
                <video src={video} autoPlay muted loop></video>

                <div className="textDiv">
                    <h2 className="title">Sistema de Reuniões SIATT</h2>
                    <p>Sistemas Integrados de Alto Teor Tecnológico</p>
                </div>

                <div className="footerDiv flexAlignCenter ">
                    <span className="text">Não tem uma conta? </span>
                    <Link to={'/register'}>
                    <button className="btn">Inscreva-se</button>
                    </Link>
                 </div>
            </div>

            <div className="formDiv flexAlignCenter">
                <div className="headerDiv">
                    <img src={logo} alt="Logo Image"/>
                    <h3>Bem-vindo novamente!</h3>
                </div>

                <form action="" className="form grid">
                    <span className="showMessage">Aqui vai o status do Login</span>

                    <div className="inputDiv">
                        <label htmlFor="username">Email</label>
                        <div className="input flexAlignCenter">
                        <FaUserShield className='icon'/>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Entrar com email"></input>
                        </div>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="password">Senha</label>
                        <div className="input flexAlignCenter">
                        <BsFillShieldLockFill className='icon'/>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Senha"></input>
                        </div>
                    </div>

                    <button type="button" className="btn flexAlignCenter" onClick={handleLogin}>
                        <span>Login</span>
                        <AiOutlineSwapRight className='icon' />
                    </button>

                    <span className="forgotPassword">
                        Esqueceu da senha? <a href="">Click Aqui</a>

                    </span>

                </form>

            </div>

        </div>
        </div>

    )
}

export default Login