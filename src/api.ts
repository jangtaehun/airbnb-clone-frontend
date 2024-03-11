import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

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

// 사용자 정보 가져오기 -> login
export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

// logout
export const logOut = () =>
    instance.post(`users/log-out`, null,{
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }).then((response) => response.data);

// git 로그인
export const githubLogIn = (code:string) =>
    instance.post(
        'users/github',  // python에서 views 만들고 url 추가
        {code}, 
        {headers: {"X-CSRFToken": Cookie.get("csrftoken") || ""}}
        ).then((response)=>response.status);

// kakao 로그인
export const kakaoLogIn = (code:string) => 
    instance.post(
        'users/kakao',  // python에서 views 만들고 url 추가
        {code}, 
        {headers: {"X-CSRFToken": Cookie.get("csrftoken") || ""}}
        ).then((response)=>response.status);