import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";


// 호스트인지 확인
export default function useHostOnltPage() {
    const {user, userLoading} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(!userLoading) {
            if(!user?.is_host){
                navigate('/')
            }
        }
    }, [userLoading, user, navigate])

    return;
}