import Sidebar from "../Sidebar";

export default function PageWrapper({ children }) {
    return (
        <div className='flex_start lg:flex-row w-full flex-col'>
            <Sidebar></Sidebar>
            <div className='w-[80%] p-8 '>
                {children}
            </div>
        </div>
    )
}