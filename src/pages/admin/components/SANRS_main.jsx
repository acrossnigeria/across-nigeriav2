import { useState } from "react";
import SANRS_stat from "./SANRS_stat";
import SANRS_phase_manage from "./SANRS_phase_manage";


const SANRS_main = () => {
    const [ presentPage, setPresentPage ] = useState(1);

    const handlePageChange = (page) => {
        setPresentPage(page);
    }

    return (
        <>
        { presentPage === 1 && <SANRS_stat changePage={handlePageChange}/> }
        { presentPage === 2 && <SANRS_phase_manage changePage={handlePageChange}/> }
        </>
    );
}

export default SANRS_main;