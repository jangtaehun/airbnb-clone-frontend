import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUser, FaKey } from "react-icons/fa";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUser /></Box>} />
                            <Input variant={"filled"} placeholder="ID" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaKey /></Box>} />
                            <Input variant={"filled"} placeholder="Password" type="password"/>
                        </InputGroup>
                    </VStack>
                </ModalBody>

                <ModalFooter pb={3}>
                    <Button colorScheme="red" width="100%">Log in</Button>
                </ModalFooter>

                {/* 다른 페이지 css import */}
                <SocialLogin />

            </ModalContent>
        </Modal>
    );
}