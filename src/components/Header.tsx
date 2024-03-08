import { Box, Button, DarkMode, HStack, IconButton, Stack, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { FaCat, FaMoon, FaSun } from "react-icons/fa";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";


export default function Header() {
    const{isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure()
    const{isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure()
    const{colorMode, toggleColorMode} = useColorMode()
    const logoColor = useColorModeValue("red.500", "red.300"); // light, dark
    // const Icon = useColorModeValue(FaMoon, FaSun); // react는 컴포넌트를 대문자로 적어야 한다.
    
    return (
        // direction을 설정하기 위해서는 H, VStack을 쓰면 안된다. -> Stack
        <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        py={5} 
        px={40} 
        borderBottomWidth={"1px"}
        direction={{
            sm:"column",
            md:"row",
        }}
        spacing={{
            sm:3,
            md:0
        }}
        >
            <Box color={logoColor}>
                <Link to={"/"}>
                <FaCat size={"48px"} />
                </Link>
            </Box>

            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={colorMode === "light" ? <FaMoon />: <FaSun />}  />
                <Button onClick={onLoginOpen}>Log in</Button>
                <DarkMode>
                    <Button colorScheme="red" onClick={onSignUpOpen} >Sign up</Button>
                </DarkMode>
            </HStack>

            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

        </Stack>
    )
}