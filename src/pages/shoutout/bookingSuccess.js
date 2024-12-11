import Layout from "@/components/Layout";
import SuccessComponent from "@/components/shout-out/successComponent";

const bookingSuccess = () => {
    return (
        <Layout>
            <SuccessComponent/>        
        </Layout>
   
    )
}

bookingSuccess.auth = true;
export default bookingSuccess;