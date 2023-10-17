"use client";

import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from 'react'

const LogoutPage = () => {
    const router = useRouter();
    const {setAuthStatus} = useAuth();

    React.useEffect(() => {
        appwriteService.logout()
        .then(() => {
            setAuthStatus(false);
            router.replace("/");
        })
    },[])

    return (
        <></>
    )
}

export default LogoutPage