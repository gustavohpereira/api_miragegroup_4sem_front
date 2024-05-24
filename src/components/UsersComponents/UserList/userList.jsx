import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AiFillEdit } from "react-icons/ai";

export default function UserList() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/user/fetchall").then((response) => {
            setData(response.data)
        })
    }, [])

    const renderTable = () => {
        return data.map((user, index) => {
            const color = index % 2 === 0 ? 'bg-slate-500 text-black' : 'bg-amber-200'
            return (
                <tr key={user.id} className={`${color} text-white`}>
                    <td className='px-4 py-2'>{user.id}</td>
                    <td className='px-4 py-2'>{user.name}</td>
                    <td className='px-4 py-2'>{user.email}</td>
                    <td className='px-4 py-2'>{user.role}</td>
                    <td className='px-4 py-2'>{user.access_level}</td>
                    <a className='w-full h-11 flex justify-center hover:bg-[#F6A700] hover:cursor-pointer' href={`/editUser/${user.id}`}>
                        <AiFillEdit  className='w-full h-6'/>
                    </a>
                </tr>
            )
        })
    }

    const navigate = useNavigate()
    const registerUser = () => {
        navigate("/addUser")
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-bold text-4xl">Usuários</h1>
                <button className='py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-900' onClick={registerUser}>Criar novo usuário</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className='bg-gray-800 text-white'>
                            <th className='px-4 py-2'>ID</th>
                            <th className='px-4 py-2'>Nome</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Diretoria</th>
                            <th className='px-4 py-2'>Nível de acesso</th>
                            <th className='px-4 py-2'>Editar</th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )
}