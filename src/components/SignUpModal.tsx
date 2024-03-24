import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useToast } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUser, FaKey, FaEnvelope,FaUserSecret } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersignUp } from "../api";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    name: string
    username: string
    email: string
    password: string
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({mutationFn:UsersignUp,
        onSuccess: () => {
            toast({
                status: "success",
                title: "Welcome!",
                position: "bottom-right",
                description: "Happy to have you back!",
            });
            onClose();
            queryClient.refetchQueries({queryKey:["me"]});
            reset()
        },

        onError: (error:any) => {
            setErrorMessage(error.response?.data.Failed);
            toast({
                status: "error",
                title: "Login Failed",
                position: "bottom-right",
            })
            reset()
        }
    })

    const onSubmit = ({name, username, email, password}:IForm) => {
        mutation.mutate({name, username, email, password})
    }

    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />

                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUser /></Box>} />
                            <Input isInvalid={Boolean(errors.name?.message)} {...register("name", {required:"Please write Name"})} variant={"filled"} placeholder="이름" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaEnvelope /></Box>} />
                            <Input isInvalid={Boolean(errors.email?.message)} {...register("email", {required:"Please write Email"})} variant={"filled"} placeholder="이메일" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUserSecret /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", {required:"Please write Username"})} variant={"filled"} placeholder="닉네임" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaKey /></Box>} />
                            <Input isInvalid={Boolean(errors.password?.message)} {...register("password", {required:"Please write Password"})} variant={"filled"} placeholder="비밀번호" type="password"/>
                        </InputGroup>

                    </VStack>

                    {mutation.isError ? <Text color={"red.400"} textAlign={"center"} fontSize={"sm"}>{errorMessage}</Text>:null}
                    <Button isLoading={mutation.isPending} type="submit" colorScheme="red" width="100%" mt={5}>Sign up</Button>
                </ModalBody>


                {/* 다른 페이지 css import */}
                <SocialLogin />

            </ModalContent>
        </Modal>
    );
}