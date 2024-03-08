import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import {FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <Box>
                    <HStack mb={3}>
                        <Divider />
                        <Text textTransform={"uppercase"} color={"gray.400"} fontSize="xs" as="b">Or</Text>
                        <Divider />
                    </HStack>

                    <HStack justifyContent={"center"} pb={3} px={3}>
                        <Button w="100%" leftIcon={<FaGithub />} colorScheme="gray">
                            Continu with Github
                        </Button>
                        <Button w="100%" leftIcon={<FaComment />} colorScheme="yellow">
                            Continu with Kakao
                        </Button>
                    </HStack>
                </Box>
    )
}