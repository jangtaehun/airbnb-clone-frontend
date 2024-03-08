import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUser, FaKey, FaEnvelope,FaUserSecret } from "react-icons/fa";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUser /></Box>} />
                            <Input variant={"filled"} placeholder="이름" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaEnvelope /></Box>} />
                            <Input variant={"filled"} placeholder="이메일" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUserSecret /></Box>} />
                            <Input variant={"filled"} placeholder="닉네임" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaKey /></Box>} />
                            <Input variant={"filled"} placeholder="비밀번호" />
                        </InputGroup>

                    </VStack>
                </ModalBody>

                <ModalFooter pb={3}>
                    <Button colorScheme="red" width="100%">Sign up</Button>
                </ModalFooter>

                {/* 다른 페이지 css import */}
                <SocialLogin />

            </ModalContent>
        </Modal>
    );
}