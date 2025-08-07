import Layout from "@/components/Layout";
import SubmitEntryCode from "./components/SubmitEntryCode";
import CodeSubmitted from "./components/CodeSubmitted";
import { useEffect, useState } from "react";
import PageLoading from "./components/PageLoading";
import axios from "axios";
import { useSession } from "next-auth/react";

const SquidGameHome = () => {
    const [ displayPage, setDisplayPage ] = useState(0);
    const [ loadError, setLoadError ] = useState('');
    const [ errorOccurred, setErrorOccurred ] = useState(false);

    const { data:session } = useSession();

    const handleError = (error) => {
        setLoadError(error);
        setErrorOccurred(true);
    }

    const reload = async () => {
        setErrorOccurred(false);
        await checkUser();
    }

    const checkUser = async () => {
        if ( session ) {
            try {
                const response = await axios.get(`/api/squid_game/validateCode?userId=${session?.user?._id}`);
                if ( response?.data?.isUserSubmitted ) {
                    setDisplayPage(2);
                } else {
                    setDisplayPage(1);
                }
            } catch (error) {
                handleError(error.message);
            }
        }
    }


    useEffect( () => {
        const getUser = async () => {
            await checkUser()        
        }
        getUser();
    }, [ session ]);
    
    return (
        <Layout>
            <div id="top"></div>
            { displayPage === 0 && <PageLoading errorOccurred={errorOccurred} errorMessage={loadError} reload={reload} /> }
            { displayPage === 1 && <SubmitEntryCode setUserValidated={setDisplayPage}/> }
            { displayPage === 2 && <CodeSubmitted/> }
        </Layout>
    )
}

SquidGameHome.auth = true;

export default SquidGameHome;