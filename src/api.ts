import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true, //api에 요청을 할 때 cookie를 보내겠다 + settings에 추가
})

export const getRooms = () => instance.get("rooms/").then(response => response.data)

export const getRoom = ({queryKey}: QueryFunctionContext) => {
    console.log(queryKey)
    const [_, roomPk] = queryKey
    return instance.get(`rooms/${roomPk}`).then(response => response.data)
    // return instance.get(`rooms/${queryKey[1]}`).then(response => response.data)
}

export const getRoomReviews = ({queryKey}: QueryFunctionContext) => {
    console.log(queryKey)
    const [_, roomPk] = queryKey
    return instance.get(`rooms/${roomPk}/reviews`).then(response => response.data)
}

// 사용자 정보 가져오기
export const getMe = () => 
    instance.get("users/me").then((response) => response.data);