import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IProtectedPageProps {
    children: React.ReactNode;
}

// 사용자가 로그인되어있는지만 확인
export default function ProtectedPage({children}: IProtectedPageProps) {
    const {isLoggedIn, userLoading} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(!userLoading) {
            if(!isLoggedIn){
                navigate('/')
            }
        }
    }, [userLoading, isLoggedIn, navigate])

    return <>{children}</>
}