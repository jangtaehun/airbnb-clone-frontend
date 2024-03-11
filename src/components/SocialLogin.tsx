import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import {FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "2a7311e4d93424f2afe213fdd938125b",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    }
    const params = new URLSearchParams(kakaoParams).toString()

    return (
        <Box>
                    <HStack mb={3}>
                        <Divider />
                        <Text textTransform={"uppercase"} color={"gray.400"} fontSize="xs" as="b">Or</Text>
                        <Divider />
                    </HStack>

                    <HStack justifyContent={"center"} pb={3} px={3}>
                        <Button
                            as={"a"}
                            href="https://github.com/login/oauth/authorize?client_id=a39903303d8e1aadf8f5&scope=read:user,user:email"
                            // scope = 사용자로부터 얻고 싶은 정보 목록 / 설정하지 않으면 사용자의 public 정보만 받을 수 있다.
                            w="100%"
                            leftIcon={<FaGithub />}
                            colorScheme="gray">
                            Continu with Github
                        </Button>

                        <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${params}`} w="100%" leftIcon={<FaComment />} colorScheme="yellow">
                            Continu with Kakao
                        </Button>
                    </HStack>
                </Box>
    )
}