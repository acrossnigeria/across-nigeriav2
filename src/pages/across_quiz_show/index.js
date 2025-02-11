import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FileIcon from "../../../public/images/icon/FileIcon";
import Upload from "../../../public/images/icon/Upload";
import DeleteIcon from "../../../public/images/icon/DeleteIcon";
import Link from "next/link";
import ImgIcon from "../../../public/images/icon/ImgIcon";
import CycleLoader from "@/components/CycleLoader";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../public/images/icon/Close";
import SuccessIcon from "../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";
import ExitConfirmScreen from "@/components/ExitConfirmScreen";
import { getSession } from "next-auth/react";

export async function  getServerSideProps(context) {
    const session = await getSession(context);
    const userId = session?.user?._id??false;
      const response = await axios.get(`https://acrossnig.com/api/across_quiz_show/handler?type=CHECKUSER&userId=${userId}`);
      const isUserRegistered = response.data.isUserFound;

      if ( isUserRegistered ) {
        return { props: { message: 'user registered, proceed.', } }
      } else {
        return { props: { message: 'user not registered, proceed.'} }
      }
   
} 

const Index = () => {
    return (
        <div>Across quiz show home</div>
    )
}

index.auth = true;
export default Index;