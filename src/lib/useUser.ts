import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export interface IUser {
    last_login: string;
    username: string;
    email: string;
    date_joined: string;
    avatar: string;
    name: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
  }

export default function useUser() {
    const {isLoading, data, isError} = useQuery<IUser>({queryKey:["me"], queryFn: getMe, retry:false});
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}