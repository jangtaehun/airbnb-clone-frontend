import { Avatar, Box, Button, DarkMode, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, ToastId, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { FaCat, FaMoon, FaSun } from "react-icons/fa";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";


export default function Header() {
    const {userLoading, isLoggedIn, user} = useUser();

    const{isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure()
    const{isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure()
    const{colorMode, toggleColorMode} = useColorMode()
    const logoColor = useColorModeValue("red.500", "red.300"); // light, dark
    // const Icon = useColorModeValue(FaMoon, FaSun); // react는 컴포넌트를 대문자로 적어야 한다.
    
    const toast = useToast();
    const queryClient = useQueryClient();

    const toastId= useRef<ToastId>();
    const mutation = useMutation({mutationFn:logOut, 
        onMutate: () => {
            toastId.current = toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            position: "bottom-right",
            });
        },
        onSuccess: (data) => {
            if(toastId.current){
                queryClient.refetchQueries({queryKey:["me"]});
                toast.update(toastId.current, {
                status: "success",
                title: "Done!",
                description: "See you later!",
            });
            }
        },
    })
    const onLogOut = async () => {
        mutation.mutate()
    }

    // const onLogOut = async () => {
    //     const toastId = toast({
    //       title: "Login out...",
    //       description: "Sad to see you go...",
    //       status: "loading",
    //       position: "bottom-right",
    //     });
    //     await logOut();
    //     // api에서 logOut을 받아온다
    //     // CSRT: cross-site request forgery -> 해커가 사용하는 공격의 일종 해커의 사이트로부터 post 요청을 보내 속이는 방법
    //     // credentials를 이용해 정보를 훔치는 것을 목적으로 한다. -> Django는 기본적으로 이 공격을 차단하도록 설정
    //     // 어떠한 사이트에서든 post 요청을 신뢰하지 않는다.

    //     queryClient.refetchQueries({queryKey:["me"]});
    //     toast.update(toastId, {
    //         status: "success",
    //         title: "Done!",
    //         description: "See you later!",
    // });
    // };

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

            {/* cookie가 달라서 로그인이 안 된다. -> cookie를 준 domain과 api 요청을 보내는 도메인을 일치시켜야 한다.*/}
            {/* 하지만 Django backend는 아무나 fetch 하도록 허락하지 않는다. */}
            {/* "http://127.0.0.1:3000" 사용 + settings에 추가 */}
            <HStack spacing={2}>
                    <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={colorMode === "light" ? <FaMoon />: <FaSun />}  />
                    
                    {!userLoading ? (
                        !isLoggedIn ? (
                        <>  
                            {/* user 정보를 로딩 중이 아니고 사용자가 로그인하지 않았다면 보여준다 , 공통된 부모가 없는 두 개의 element를 반환 못 한다. -> <> </> 사용*/}
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <DarkMode>
                                <Button colorScheme="red" onClick={onSignUpOpen} >Sign up</Button>
                            </DarkMode>
                        </> ) : (
                            <Menu>
                                <MenuButton>
                                    <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                                </MenuButton>
                                <MenuList>
                                    {user?.is_host? <Link to="/rooms/upload"><MenuItem>Upload room</MenuItem></Link>: null}
                                    <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                </MenuList>
                            </Menu>
                        )
                    ) : null}
            
            </HStack>

            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

        </Stack>
    )
}