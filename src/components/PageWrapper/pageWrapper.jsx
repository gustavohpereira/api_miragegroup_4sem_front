import Sidebar from "../sidebar";

export default function PageWrapper({children}) {
    return (
        <div className='flex_start lg:flex-row w-full flex-col'>
            <Sidebar></Sidebar>
            <div className='w-full p-8 '>
                {children}
            </div>
        </div>
    )
}