import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import Trophy1Icon from "../../../../../public/images/icon/Trophy1Icon";
import Profile from "../../../../../public/images/icon/Profile";
import { InfoIcon } from "lucide-react";

const Gallery = () => {
    const router = useRouter();

    return (
        <Layout title={'Across Skit Competition: win money making skits, for all skit makers and theater art students'} hideNav={true}>
        </Layout>
    )
}

export default Gallery;