import Container from "@/components/admin-components/Container";
import UnderCIcon from "@/components/admin-components/graphics/UnderCIcon";

export default function Dashboard() {
    return (
        <Container>
            <div className="h-screen md:w-[100%] border-1 flex flex-col justify-center items-center">
                <UnderCIcon/>
                <span>Page is still under construction</span>
            </div>
        </Container>
    )
}