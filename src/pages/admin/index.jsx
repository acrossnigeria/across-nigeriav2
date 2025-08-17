import Link from "next/link";
import setRealVH from "../../../utils/setRealVH";
import Profile from "../../../public/images/icon/Profile";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Bell, ChevronDown, Home, Layers, Megaphone, Menu, PanelLeftClose, PanelLeftOpen, UsersIcon, X } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import AmbassadorProgram from "./components/AmbassadorProgram";

const AdminMainPage = ( { user }) => {
    const [ isHamOpen, setIsHamOpen ] = useState(false);
    const [ isPanelOpen, setIsPanelOpen ] = useState(true);
    const [ activePage, setActivePage ] = useState('01');
    const [ panelMenu, setPanelMenu ] = useState([
        {
            title: 'Dashboard',
            icon: <Home strokeWidth={1.5} color="#ffffff"/>,
            pageId: '01'
        },
        {
            title: 'Users registry',
            icon: <UsersIcon strokeWidth={1.5} color="#ffffff"/>,
            pageId: '02'
        },
        {
            title: 'Products catalog',
            isCatalog:true,
            isCatalogOpen:false,
            icon:<Layers strokeWidth={1.5} color="#ffffff"/>,
            pageId: '03',
            content: [
                { title: 'Skit ANRS', id: 'p1' },
                { title: 'Giveaway Quizies', id: 'p2' },
                { title: 'King & Queen ANRS', id: 'p3' }
            ]
        },
        {
            title: 'Campaigns',
            isCatalog:true,
            isCatalogOpen:false,
            icon:<Megaphone strokeWidth={1.5} color="#ffffff"/>,
            pageId: '04',
            content: [
                { title: 'Ambassador Program', id: 'p4' },
                { title: 'Referral Program', id: 'p5' },
            ]
        },
    ])
    
    const handlePanelToggle = () => {
        panelMenu.forEach(item => {
            item.isCatalogOpen = false;
        });
        setIsPanelOpen(!isPanelOpen);
    }

    const pages = {
        "01": { page: <Dashboard/>, title: 'Dashboard' },
        "02": { page: <Users/>, title: 'Users registry' },
        "p1": { page: <Dashboard/>, title: 'Skit ANRS' },
        "p5": { page: <Users/>, title: 'Referral Program' },
        "p3": { page: <Dashboard/>, title: 'King & Queen ANRS' },
        "p4": { page: <AmbassadorProgram/>, title: 'Ambassador Program' },
        "p2": { page: <Users/>, title: 'Giveaway Quizies' },
    }

    const handlePageChange = ( pageId ) => {
        setActivePage(pageId);
    }

    const handleCatalogToggle = ( pageId ) => {
        const updatedMenu = panelMenu.map( ( item ) => {
            if ( item.pageId === pageId ) {
                return { ...item, isCatalogOpen: !item.isCatalogOpen };
            }
            return item;
        });
        console.log(updatedMenu);
        setPanelMenu(updatedMenu);
    }

    setRealVH();
    return (
        <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="flex gap-3 font-poppins justify-between bg-gray-100 p-3  flex-row">

            <div className={`${isPanelOpen ? 'w-[280px]' : 'w-[60px]'} h-[95%] top-[2.5%] transition-all duration-300 fixed ease-in-out rounded-[15px] overflow-x-hidden bg-green-700 flex flex-col gap-3 items-center justify-between p-3 border`}>
                <div className={`${isPanelOpen ? 'justify-end' : ' justify-center'} w-full items-center flex flex-row`}>
                    <button onClick={handlePanelToggle} className="hover:bg-green-600 p-2 rounded-[15px]">
                        { isPanelOpen ? <PanelLeftClose strokeWidth={1.5} color="#ffffff"/> : <PanelLeftOpen strokeWidth={1.5} color="#ffffff"/> }
                    </button>
                </div>
                <div className="flex-grow border-y border-y-green-500 transition-all duration-300 ease-in-out w-full flex flex-col gap-2 py-2">
                    { panelMenu.map( ( { title, icon, pageId, isCatalog, isCatalogOpen, content } ) => {
                        if ( !isCatalog ) {
                        return (
                            <button key={pageId} onClick={() => handlePageChange(pageId)} className={`${isPanelOpen ? 'justify-start' : ' justify-center'} w-full items-center flex flex-row`}>
                                <div className={`${isPanelOpen ? 'justify-start w-full' : ' justify-center'} ${activePage === pageId ? 'bg-green-900' : 'hover:bg-green-600'} p-2 flex flex-row items-center gap-2 rounded-[15px]`}>
                                    {icon}
                                    <span className={`${isPanelOpen ? 'inline' : 'hidden'} text-white text-[15px]`}>{title}</span>
                                </div>
                            </button>
                        )} else {
                            return (
                                <div key={pageId} onClick={() => handleCatalogToggle(pageId)} className={`${isPanelOpen ? 'justify-start' : ' justify-center'} w-full items-center flex flex-col`}>
                                    <div className={`${isPanelOpen ? 'justify-between w-full' : ' justify-center'} ${activePage === pageId ? 'bg-green-900' : 'hover:bg-green-600'} w-full p-2 flex cursor-pointer flex-row items-center gap-2 rounded-[15px]`}>
                                        <div className="flex flex-row items-center gap-2 w-fit">
                                            {icon}
                                            <span className={`${isPanelOpen ? 'inline' : 'hidden'} text-white text-[15px]`}>{title}</span>
                                        </div>
                                        { isPanelOpen && (
                                            <ChevronDown className={`${isCatalogOpen ? 'rotate-180' : ''} transition-all ease-in-out duration-300`} strokeWidth={1.5} color="white" size={'20px'}/>
                                        )}
                                    </div>
                                    { isPanelOpen && (
                                        <div className={`${isCatalogOpen?'h-fit border-l-green-500 border-l' : 'h-0'} flex overflow-hidden transition-all duration-300 ease-in-out flex-col mt-1 items-start gap-2 w-[93%] self-end justify-start`}>
                                            { content.map( ( item ) => {
                                                return (
                                                    <button key={item.id} onClick={() => handlePageChange(item.id)} className={`${activePage === item.id ? 'bg-green-900' : 'hover:bg-green-600'} w-full py-1 rounded-r-[9px] text-start pl-5 text-white text-[13px]`}>{item.title}</button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={`${isPanelOpen ? 'justify-start' : ' justify-center'} w-full items-center flex flex-row`}>
                    <button className={`${isPanelOpen ? 'justify-start w-full' : ' justify-center'}  hover:bg-green-600 p-2 flex flex-row items-center gap-2 rounded-[15px]`}>
                        <Bell color="#ffffff"/>
                        <span className={`${isPanelOpen ? 'inline' : 'hidden'} text-white text-[15px]`}>Notifications</span>
                    </button>
                </div>

            </div>

            <div className={`${isPanelOpen ? 'w-[calc(100%-290px)] ml-[290px]' : 'w-[calc(100%-70px)] ml-[70px]'} p-2 transition-all duration-300 ease-in-out h-full`}>
                <div className={`flex h-[50px] flex-row justify-between items-center`}>
                    <span className="text-[20px] text-green-900 font-bold">{pages[activePage]?.title}</span>
                    <div style={{alignItems:'center'}} className="flex w-fit flex-row justify-between gap-2 pl-3 pr-[2px] cursor-pointer transition duration-100 text-[16px]">
                        <Link href={'/user/profile'}>Welcome, {user?.name}</Link>
                        <Profile size={'45px'} bg={'#b4bedf'}/>
                        <button onClick={()=>{setIsHamOpen(!isHamOpen)}} className={` ml-1 p-3 md:hidden rounded-full hover:bg-gray-900`}>
                            {isHamOpen?<X color={"#b4bedf"}/>:<Menu/>}
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    {pages[activePage]?.page}
                </div>

            </div>
        </div>
    )
}

export default AdminMainPage;


export async function  getServerSideProps(context) {
    const session = await getSession(context);

    if ( !session || !session?.user?.isAdmin) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    };

    return { props: { user: session?.user } };
    
}