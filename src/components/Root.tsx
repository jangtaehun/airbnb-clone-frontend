import { Box, Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaCat } from "react-icons/fa";

export default function Root() {
    return (
    <Box>
        <HStack justifyContent={"space-between"} py={5} px={10} borderBottomWidth={"1px"}>
            <Box color={"red.300"}>
                <FaCat size={"48px"}/>
            </Box>

            <HStack spacing={2}>
                <Button bg={"red.300"}>Log in</Button>
                <Button colorScheme="red">Sign up</Button>
            </HStack>

        </HStack>
        <Outlet />
    </Box>
    );
}

// Outlet은 루트의 중앙에 우리가 렌터릴 하고싶은 컴포넌트를 위치시킨다.