import UnderCIcon from "@/components/admin-components/graphics/UnderCIcon";
import Container from "@/components/admin-components/Container";
import { getSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";


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

export default function Gqrs( { user }) {
    const [ selectedWinners, setSelectedWinners ] = useState(null);
    const [ isChecked, setIsChecked ] = useState(false);

    const getWinners = async () => {
       const response = axios.get( '/api/admin/genGiveawayQuizWinners');
       console.log(response);
    }

    return (
        <div>
            <Container admin={user} page={'gqrs'}>
                <div className="h-screen md:w-[100%] gap-3 border-1 flex flex-col pt-[250px] items-center">
                    <div className="flex flex-col gap-3 items-center">
                        <span>No winners selected</span>
                        <button onClick={getWinners} className={`bg-transparent flex flex-row border-1 border-gray-600 justify-center rounded-[5px] text-gray-800 hover:bg-gray-400 items-center w-[200px] h-[50px]`}>Generate winners</button>
                    </div>
                </div>
            {/* <div className="h-screen md:w-[100%] gap-3 border-1 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div> */}
            </Container> 
        </div>
    )
}
