import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function Root() {
    return (
    <Box>
        <Header />
        <Outlet />
        <ReactQueryDevtools />
    </Box>
    );
}

// Outlet은 루트의 중앙에 우리가 렌터릴 하고싶은 컴포넌트를 위치시킨다.