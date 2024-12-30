import Container from "@/components/admin-components/Container";
import UnderCIcon from "@/components/admin-components/graphics/UnderCIcon";
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

export default function Dashboard( { user } ) {
    return (
        <Container admin={user} page={'dashboard'}>
            <div className="h-screen md:w-[100%] border-1 gap-3 flex flex-col pt-[250px] items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div>
        </Container>
    )
}