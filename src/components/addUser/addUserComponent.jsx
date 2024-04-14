import { useState } from 'react';
import PageTitle from "../pageTitle/PageTitle";
import axios from 'axios';

export function AddUserComponent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [access, setAccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name: name,
            email: email,
            password: password,
            role: role,
            access_level: Number.parseInt(access)
        }

        console.log(data);

        try{
            await axios.post("http://localhost:8080/user/create", data).then((response) => {
                alert(response.status)
            })
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="">
            <PageTitle>Cadastrar usuário</PageTitle>
            <form className="standardFlex flex-col gap-8 my-1 mt-20 items-center lg:full" onSubmit={handleSubmit}>
                <div className="standardFlex flex-col w-2/3 text-2xl gap-2 items-center">
                    <label htmlFor="name" className="text-2xl ">Nome Completo</label>
                    <input type="text" id="name" name="name" placeholder="Digite o nome completo" required onChange={(e) => { setName(e.target.value) }} className=" rounded-lg w-full p-2 bg-[#D9D9D9]  " />
                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl items-center gap-4">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="Digite a senha" required onChange={(e) => { setEmail(e.target.value) }} className=" rounded-lg  p-2 w-full bg-[#D9D9D9]  "/>
                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl items-center gap-4">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" placeholder="Digite a senha" required onChange={(e) => { setPassword(e.target.value) }} className=" rounded-lg w-full p-2 bg-[#D9D9D9]  "/>
                </div>
                <div className="flex w-2/3 gap-10">
                    <div className="standardFlex flex-col w-2/3 text-2xl items-center gap-4">
                        <label htmlFor="diretoria">Diretoria</label>
                        <select id="diretoria" name="diretoria" required onChange={(e) => { setRole(e.target.value) }} className="border bg-[#D9D9D9] rounded-lg p-1 w-full ">
                            <option value="" disabled selected>Escolha a diretoria</option>
                            <option value="financeira">Financeira</option>
                            <option value="comercial">Comercial</option>
                            <option value="tecnica">Técnica</option>
                        </select>
                    </div>
                    <div className="standardFlex flex-col w-2/3 text-2xl items-center gap-4">
                        <label htmlFor="permissao">Nível de Permissão</label>
                        <select id="permissao" name="permissao" required onChange={(e) => { setAccess(e.target.value) }} className="border bg-[#D9D9D9] rounded-lg p-1 w-full ">
                        <option value="" disabled selected>Escolha o nível de permissão</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className="w-full standardFlex justify-center  lg:w-2/3 ">

                    <button type="submit" className="rounded-lg bg-[#FED353] lg:w-[20%] w-1/2 mt-8 text-2xl h-12 hover:bg-[#F6A700]">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}