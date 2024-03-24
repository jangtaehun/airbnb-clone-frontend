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


// 기본 로그인
export interface IUsernameLoginVariables {
    username:string
    password:string
}
export interface IUsernameLoginSuccess {
    ok:string
}
export interface IUsernameLoginError {
    error:string
}

export const usernameLogIn = ({username, password}:IUsernameLoginVariables) => 
    instance.post(
        'users/log-in',  // python에서 views 만들고 url 추가
        {username, password}, 
        {headers: {"X-CSRFToken": Cookie.get("csrftoken") || ""}}
        ).then((response)=>response.data);

export interface ISignUp {
    name: string
    username: string
    email: string
    password: string
}
// sign up
export const UsersignUp = ({name, username, email, password}:ISignUp) =>
    instance.post(
        'users/sign-up',
        {name, username, email, password},
        {headers: {"X-CSRFToken": Cookie.get("csrftoken") || ""}}
        ).then((response)=>response.data);

// amenities 가져오기
export const getAmenities = () =>
    instance.get(`rooms/amenities`).then((response) => response.data);

export const getCategory = () =>
    instance.get(`categories`).then((response) => response.data);


export interface IUploadRoomVariables {
        name: string;
        country: string;
        city: string;
        price: number;
        rooms: number;
        toilets: number;
        description: string;
        address: string;
        pet_friendly: boolean;
        kind: string;
        amenities: number[];
        category: number;
    }
      
export const uploadRoom = (variables: IUploadRoomVariables) =>
        instance
        .post(`rooms/`, variables, {
            headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);