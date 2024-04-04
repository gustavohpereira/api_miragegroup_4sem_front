import PageTitle from "../pageTitle/PageTitle";

export function AddUserComponent() {
    return (
        <div className="">
            <PageTitle>Cadastrar usuario</PageTitle>
            <form className="standardFlex flex-col gap-8 my-10 items-center lg:full">
                <div className="standardFlex flex-col w-2/3 gap-2 items-center">

                    <label htmlFor="username" className="text-2xl ">Nome Completo</label>
                    <input type="text" id="username" name="username" className=" rounded-lg w-full p-2 bg-[#D9D9D9]  " />
                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl items-center  gap-4">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" className=" rounded-lg  p-2 w-full bg-[#D9D9D9]  "/>

                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl items-center  gap-4">
                    <label htmlFor="cargo">Cargo</label>
                    <input type="text" id="cargo" name="cargo" className=" rounded-lg w-full p-2 bg-[#D9D9D9]  "/>

                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl items-center  gap-4">
                    <label htmlFor="password">Tipo de usuario</label>
                    <select id="tipoUsuario" name="tipoUsuario" className="border bg-[#D9D9D9] rounded-lg p-1 w-full ">
                        <option value="admin">Administrador</option>
                        <option value="comum">Usuário Comum</option>
                        <option value="convidado">Convidado</option>
                    </select>

                </div>
                <div className="w-full standardFlex justify-center  lg:w-2/3 ">

                    <button type="submit" className="rounded-lg bg-[#FED353] lg:w-[20%] w-1/2  h-10  hover:bg-[#F6A700]">Submit</button>
                </div>
            </form>
        </div>
    );
}