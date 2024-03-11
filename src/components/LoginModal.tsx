import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUser, FaKey } from "react-icons/fa";
import { useState } from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const onChange = (e:React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        if (name === "username") {
            setUsername(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email.includes("@")){
            setEmailError("Please write valid email")
        }
        console.log(username, password)
    }

    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />

                <ModalBody as={"form"} onSubmit={onSubmit as any}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUser /></Box>} />
                            <Input value={username} onChange={onChange} name="username" variant={"filled"} placeholder="ID" required/>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaKey /></Box>} />
                            <Input value={password} onChange={onChange} name="password" variant={"filled"} placeholder="Password" type="password" required/>
                        </InputGroup>
                    </VStack>
                    <Button mt={5} mb={2} colorScheme="red" width="100%" type="submit" >Log in</Button>
                </ModalBody>

                {/* <ModalFooter pb={3} as={"form"} onSubmit={onSubmit as any}>
                    <Button colorScheme="red" width="100%" type="submit" >Log in</Button>
                </ModalFooter> */}

                {/* 다른 페이지 css import */}
                <SocialLogin />

            </ModalContent>
        </Modal>
    );
}