import UnderCIcon from "@/components/admin-components/graphics/UnderCIcon";
import Container from "@/components/admin-components/Container";
import { getSession } from "next-auth/react";


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
    return (
        <div>
            <Container admin={user} page={'gqrs'}>
            <div className="h-screen md:w-[100%] gap-3 border-1 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div>
            </Container> 
        </div>
    )
}
