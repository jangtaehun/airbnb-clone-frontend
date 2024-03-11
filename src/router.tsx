import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";


const router = createBrowserRouter([{
    path: "/", 
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            path:"",
            element: <Home />
        },

        {
            path:"rooms/:roomPk",
            element: <RoomDetail />
        },

        {
            path:"social",
            children: [
                {
                    path:"github",
                    element: <GithubConfirm />
                },

                {
                    path:"kakao",
                    element: <KakaoConfirm />
                }
            ]
        },



    ]
}])

export default router

// react-router-dom의 동작 방식은 유저가 브라우저에 작성한 url을 보는 것이다.
// 그 다음 라우터로 이동해서 해당 url의 라우터가 있는지 확인하고, 보여주고 싶은 컴포넌트를 보여준다.