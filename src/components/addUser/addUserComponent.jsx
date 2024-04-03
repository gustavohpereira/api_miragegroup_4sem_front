export function AddUserComponent() {
    return (
        <div className="p-6">
            <h1 className="text-4xl my-4">Add User</h1>
            <hr className="w-full border"></hr>
            <form className=" standardFlex flex-col gap-8 my-10 w-1/2">
                <div className="standardFlex flex-col w-2/3 gap-2">

                    <label htmlFor="username" className="text-2xl">Nome Completo</label>
                    <input type="text" id="username" name="username" className="border border-black rounded-lg  p-2 focus:bg-[#FED353] " />
                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" className="border border-black rounded-lg  p-2 focus:bg-[#FED353] "/>

                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl">
                    <label htmlFor="cargo">Cargo</label>
                    <input type="text" id="cargo" name="cargo" className="border border-black rounded-lg  p-2 focus:bg-[#FED353] "/>

                </div>
                <div className="standardFlex flex-col w-2/3 text-2xl">
                    <label htmlFor="password">Tipo de usuario</label>
                    <select id="tipoUsuario" name="tipoUsuario" className="border border-black rounded-lg p-1 ">
                        <option value="admin">Administrador</option>
                        <option value="comum">Usuário Comum</option>
                        <option value="convidado">Convidado</option>
                    </select>

                </div>
                <div className="w-full standardFlex justify-end px-8">

                    <button type="submit" className="rounded-lg bg-[#FED353] w-[12%] h-10 border border-black hover:bg-[#F6A700]">Submit</button>
                </div>
            </form>
        </div>
    );
}